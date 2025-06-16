import { type ContractId, TokenId } from "@hashgraph/sdk";
import {
  http,
  type PrivateKeyAccount,
  type WalletClient,
  createWalletClient,
  custom,
} from "viem";
import { waitForTransactionReceipt } from "viem/actions";
import type { MJToken } from "../../MJToken";
import {
  hederaApproveAllowanceABI,
  hederaAssociateABI,
  hederaErc20ABI,
  memejobABI,
} from "../../abi";
import type {
  BuyFunctionParameters,
  CreateFunctionParameters,
  SellFunctionParameters,
} from "../../types";
import { isEvmAddress, toEvmAddress } from "../../utils/address";
import { MJAdapter, type MJAdapterParameters } from "../MJAdapter";

/** EIP-1193 compliant Ethereum provider interface */
type EthereumProvider = { request(...args: any): Promise<any> };

/** Configuration with private key account for signing */
type WithAccount = {
  account: PrivateKeyAccount;
  ethereumProvider?: never;
};

/** Configuration with external Ethereum provider (e.g., `MetaMask`) */
type WithProvider = {
  account?: never;
  ethereumProvider: EthereumProvider;
};

/** Parameters for initializing `EvmAdapter` with either account or provider */
export type EVMAdapterParameters = MJAdapterParameters &
  (WithAccount | WithProvider);

/**
 * EVM-compatible adapter for interacting with memejob contracts.
 * Supports both private key accounts and external wallet providers.
 */
export class EvmAdapter extends MJAdapter {
  #account!: PrivateKeyAccount | undefined;
  #walletClient: WalletClient;

  /**
   * Initializes EVM adapter with `chain` configuration and signing method.
   * @param params - Configuration with `chain` and either `account` or `provider`
   */
  constructor(
    constructorGuard: symbol,
    {
      account,
      chain,
      contractId,
      ethereumProvider,
      ...rest
    }: EVMAdapterParameters
  ) {
    if (!isEvmAddress(contractId)) {
      throw new Error(
        "EvmAdapter requires an EVM address format (0x[A-Za-z0-9])"
      );
    }

    super(constructorGuard, { contractId, chain, ...rest });
    this.#account = account;

    this.#walletClient = createWalletClient({
      account: !ethereumProvider ? this.#account : undefined,
      chain,
      transport: ethereumProvider ? custom(ethereumProvider) : http(),
    });
  }

  /**
   * Creates a new token on memejob.
   * @param params - Token creation parameters including token info and creation config
   * @returns Promise resolving to transaction receipt
   */
  async create(params: CreateFunctionParameters) {
    const creationFee = await this.getCreationFee();
    const initialBuyAmount = params?.amount ?? 0n;
    const value = (creationFee + initialBuyAmount) * 10n ** 10n; //converted to wei

    const hash = await this.#walletClient.writeContract({
      address: toEvmAddress(this.contractId),
      abi: memejobABI,
      functionName: "memeJob",
      chain: this.chain,
      account: this.#account ?? null,
      args: [
        params.name,
        params.symbol,
        params.memo,
        params.referrer,
        initialBuyAmount,
        params.distributeRewards,
      ],
      value,
      gas: 400_000n,
    });

    return await waitForTransactionReceipt(this.#walletClient, {
      hash,
    });
  }

  /**
   * Purchases tokens from the bonding curve.
   * @param params - Buy parameters including token `address`, `amount`, and `referrer`
   * @returns Promise resolving to transaction receipt
   */
  async buy(params: BuyFunctionParameters) {
    const amountOut = await this.getAmountOut(
      params.memeAddress,
      params.amount
    );

    const hash = await this.#walletClient.writeContract({
      address: toEvmAddress(this.contractId),
      abi: memejobABI,
      functionName: "buyJob",
      chain: this.chain,
      account: this.#account ?? null,
      args: [params.memeAddress, params.amount, params.referrer],
      value: amountOut * 10n ** 10n, //converted to wei,
      gas: 200_000n,
    });

    return await waitForTransactionReceipt(this.#walletClient, {
      hash,
    });
  }

  /**
   * Sells tokens back to the bonding curve.
   * @param params - Sell parameters including token `address` and `amount`
   * @returns Promise resolving to transaction receipt
   */
  async sell(params: SellFunctionParameters) {
    const hash = await this.#walletClient.writeContract({
      address: toEvmAddress(this.contractId),
      abi: memejobABI,
      functionName: "sellJob",
      chain: this.chain,
      account: this.#account ?? null,
      args: [params.memeAddress, params.amount],
      gas: 200_000n,
    });

    return await waitForTransactionReceipt(this.#walletClient, {
      hash,
    });
  }

  /**
   * Approves token allowances for contract spending.
   * @param tokens - Array of MJTokens and amounts to approve
   * @param spender - Contract address authorized to spend tokens
   * @returns Promise resolving to array of approval transaction receipt or receipt(s) if multiple tokens provided
   */
  async approveAllowance(
    tokens: { tokenId: TokenId | string; amount: bigint }[],
    spender: ContractId
  ) {
    return Promise.all(
      tokens.map(async ({ tokenId, amount }) => {
        tokenId =
          typeof tokenId === "string" ? TokenId.fromString(tokenId) : tokenId;
        const contractAddress = toEvmAddress(tokenId);

        const hash = await this.#walletClient.writeContract({
          abi: hederaApproveAllowanceABI,
          functionName: "approve",
          address: contractAddress,
          chain: this.chain,
          account: this.#account ?? null,
          args: [toEvmAddress(spender), amount],
          gas: 750_000n,
        });

        return await waitForTransactionReceipt(this.#walletClient, {
          hash,
        });
      })
    );
  }

  /**
   * Associates one or more tokens with the current account.
   * @param tokens - Array of MJTokens to associate
   * @returns Promise resolving to transaction receipt or receipt(s) if multiple tokens provided
   */
  async associateTokens(tokens: (TokenId | string)[]) {
    return Promise.all(
      tokens.map(async (tokenId) => {
        const contractAddress = toEvmAddress(
          typeof tokenId === "string" ? TokenId.fromString(tokenId) : tokenId
        );

        const hash = await this.#walletClient.writeContract({
          abi: hederaAssociateABI,
          functionName: "associate",
          address: contractAddress,
          chain: this.chain,
          account: this.#account ?? null,
          gas: 750_000n,
        });

        return await waitForTransactionReceipt(this.#walletClient, {
          hash,
        });
      })
    );
  }

  /**
   * Retrieves token balance for the current account.
   * @param token - MJToken to query balance for
   * @returns Promise resolving to token balance as bigint
   */
  async getBalance(token: MJToken): Promise<bigint> {
    const balance = (await this.publicClient.readContract({
      address: toEvmAddress(token.tokenId),
      abi: hederaErc20ABI,
      functionName: "balanceOf",
      args: [this.#account?.address],
    })) as bigint;

    return balance;
  }
}
