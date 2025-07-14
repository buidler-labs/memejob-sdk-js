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
  ApproveAllowanceTokens,
  AssociateTokensList,
  CreateFunctionParameters,
  MJAdapterReturnType,
  MJApproveAllowanceResult,
  MJAssociateTokensResult,
  MJBuyFunctionParameters,
  MJBuyResult,
  MJSellFunctionParameters,
  MJSellResult,
  OperationalMode,
} from "../../types";
import { isEvmAddress, toEvmAddress } from "../../utils";
import { MJAdapter, type MJAdapterParameters } from "../MJAdapter";

/** EIP-1193 compliant Ethereum provider interface */
type EthereumProvider = { request(...args: any): Promise<any> };

/** Configuration with private key account for signing */
type WithAccount = {
  /** Private key account used to sign transactions */
  account: PrivateKeyAccount;
  /** External Ethereum provider must not be set when using private key account */
  ethereumProvider?: never;
};

/** Configuration with external Ethereum provider (e.g., `MetaMask`) */
type WithProvider = {
  /** No private key account when using external provider */
  account?: never;
  /** External Ethereum provider supporting EIP-1193 */
  ethereumProvider: EthereumProvider;
};

/** Parameters for initializing `EvmAdapter` with either account or provider */
export type EVMAdapterParameters<Mode extends OperationalMode> =
  MJAdapterParameters<Mode> & (WithAccount | WithProvider);

/**
 * EVM-compatible adapter for interacting with memejob contracts.
 * Supports both private key accounts and external wallet providers.
 */
export class EvmAdapter<Mode extends OperationalMode> extends MJAdapter<Mode> {
  #account!: PrivateKeyAccount | undefined;
  #walletClient: WalletClient;

  /**
   * Initializes EVM adapter with `chain` configuration and signing method.
   * @param constructorGuard - Internal symbol to protect constructor usage
   * @param params - Configuration with `chain`, `contractId`, and signing method (`account` or `ethereumProvider`)
   */
  constructor(
    constructorGuard: symbol,
    {
      account,
      chain,
      contractId,
      ethereumProvider,
      ...rest
    }: EVMAdapterParameters<Mode>
  ) {
    if (!isEvmAddress(contractId)) {
      throw new Error(
        "EvmAdapter requires an EVM address format (0x[A-Za-z0-9])"
      );
    }

    super(constructorGuard, { contractId, chain, ...rest });

    if (this.operationalMode === "returnBytes") {
      throw new Error(
        "Return bytes mode is not supported for EVM interactions."
      );
    }

    this.#account = account;

    this.#walletClient = createWalletClient({
      account: !ethereumProvider ? this.#account : undefined,
      chain,
      transport: ethereumProvider ? custom(ethereumProvider) : http(),
    });
  }

  /**
   * Creates a new meme token on the network.
   *
   * This method creates a new token and registers it with the memejob
   * bonding curve system. The token will be immediately available for trading.
   *
   * @param params - Token creation parameters including metadata and configuration
   * @param params.name - The name of the token (e.g., "My Meme Token")
   * @param params.symbol - The token symbol (e.g., "MMT")
   * @param params.memo - The IPFS path pointing to token metadata
   * @returns Promise resolving to transaction bytes or tokenId as string based on operational mode
   */
  async create<R extends MJAdapterReturnType<Mode, `0.0.${number}`>>(
    params: CreateFunctionParameters
  ): Promise<R> {
    const creationFee = await this.getCreationFee();
    const initialBuyAmount = params?.amount ?? 0n;
    const value = (creationFee + initialBuyAmount) * 10n ** 10n; // converted to wei

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

    await waitForTransactionReceipt(this.#walletClient, {
      hash,
    });

    return (await this.getTokenIdOnCreate(hash)) as R;
  }

  /**
   * Purchases tokens from the bonding curve.
   *
   * Executes a buy transaction on the bonding curve. The price is determined
   * by the current position on the curve.
   *
   * @param params - Buy parameters
   * @param params.memeAddress - Address of the token to purchase
   * @param params.amount - Amount of tokens to buy (in tiny/smallest unit)
   * @param params.referrer - Optional referrer address for referral rewards
   * @returns Promise resolving to transaction bytes or MJBuyResult based on operational mode
   */
  async buy<R extends MJAdapterReturnType<Mode, MJBuyResult>>(
    params: MJBuyFunctionParameters
  ): Promise<R> {
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
      value: amountOut * 10n ** 10n, // converted to wei
      gas: 200_000n,
    });

    const receipt = await waitForTransactionReceipt(this.#walletClient, {
      hash,
    });

    return {
      transactionIdOrHash: hash,
      status: receipt.status,
      amount: params.amount,
    } satisfies MJBuyResult as R;
  }

  /**
   * Sells tokens back to the bonding curve.
   *
   * Executes a sell transaction on the bonding curve. The sell price is determined by the
   * current position on the curve.
   *
   * @param params - Sell parameters
   * @param params.tokenAddress - Address of the token to sell
   * @param params.amount - Amount of tokens to sell (in tiny/smallest unit)
   * @returns Promise resolving to transaction bytes or MJSellResult based on operational mode
   */
  async sell<R extends MJAdapterReturnType<Mode, MJSellResult>>(
    params: MJSellFunctionParameters
  ): Promise<R> {
    const hash = await this.#walletClient.writeContract({
      address: toEvmAddress(this.contractId),
      abi: memejobABI,
      functionName: "sellJob",
      chain: this.chain,
      account: this.#account ?? null,
      args: [params.memeAddress, params.amount],
      gas: 200_000n,
    });

    const receipt = await waitForTransactionReceipt(this.#walletClient, {
      hash,
    });

    return {
      transactionIdOrHash: hash,
      status: receipt.status,
      amount: params.amount,
    } satisfies MJSellResult as R;
  }

  /**
   * Approves token allowances for contract spending.
   *
   * Grants permission to the specified memejob contract to spend tokens on behalf of
   * the current account. This is required before the contract can transfer
   * tokens during sell operations.
   *
   * @param tokens - Array of tokens and amounts to approve
   * @param spender - ContractId authorized to spend the tokens
   * @returns Promise resolving to transaction bytes or MJApproveAllowanceResult based on operational mode
   */
  async approveAllowance<
    R extends MJAdapterReturnType<Mode, MJApproveAllowanceResult>,
  >(tokens: ApproveAllowanceTokens, spender: ContractId): Promise<R[]> {
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

        const receipt = await waitForTransactionReceipt(this.#walletClient, {
          hash,
        });

        return {
          transactionIdOrHash: hash,
          status: receipt.status,
          tokens,
          spender,
        } satisfies MJApproveAllowanceResult as R;
      })
    );
  }

  /**
   * Associates one or more tokens with the current account.
   *
   * On Hedera, accounts must be associated with tokens before they can
   * receive or hold them. This method performs the association transaction.
   *
   * @param tokens - Array of token identifiers to associate with the account
   * @returns Promise resolving to transaction bytes or MJAssociateTokensResult based on operational mode
   */
  async associateTokens<
    R extends MJAdapterReturnType<Mode, MJAssociateTokensResult>,
  >(tokens: AssociateTokensList): Promise<R[]> {
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

        const receipt = await waitForTransactionReceipt(this.#walletClient, {
          hash,
        });

        return {
          transactionIdOrHash: hash,
          status: receipt.status,
          tokens,
        } satisfies MJAssociateTokensResult as R;
      })
    );
  }

  /**
   * Retrieves token balance for the current account.
   *
   * Queries the account's balance for the specified token. The balance
   * is returned in the token's smallest unit (tiny).
   *
   * @param token - MJToken instance to query balance for
   * @returns Promise resolving to token balance as bigint in smallest unit
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
