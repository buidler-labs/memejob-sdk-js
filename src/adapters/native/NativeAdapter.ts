import {
  AccountAllowanceApproveTransaction,
  type AccountId,
  Client,
  ContractExecuteTransaction,
  ContractFunctionParameters,
  type ContractId,
  Hbar,
  type PrivateKey,
  TokenAssociateTransaction,
  TokenId,
} from "@hashgraph/sdk";
import type { MJToken } from "../../MJToken";
import hederaMainnet from "../../chains/hedera-mainnet";
import hederaTestnet from "../../chains/hedera-testnet";
import { MirrorActions } from "../../mirror";
import type {
  BuyFunctionParameters,
  CreateFunctionParameters,
  SellFunctionParameters,
} from "../../types";
import { isNativeAddress, withRetry } from "../../utils";
import { MJAdapter, type MJAdapterParameters } from "../MJAdapter";

/** Configuration parameters for NativeAdapter initialization */
export type NativeAdapterParameters = MJAdapterParameters &
  (
    | {
        /** Hedera client instance */
        hederaClient: Client;
        /** No operator needed when hederaClient is provided */
        operator?: never;
      }
    | {
        /** No hederaClient needed when operator is provided */
        hederaClient?: never;
        /** Hedera operator account credentials */
        operator: {
          /** Account ID as string or AccountId object */
          accountId: AccountId | string;
          /** Private key as string or PrivateKey object */
          privateKey: PrivateKey | string;
        };
      }
  );

/**
 * Native Hedera SDK adapter for contract interactions.
 * Uses Hedera SDK directly for transaction execution and queries.
 */
export class NativeAdapter extends MJAdapter {
  #hClient: Client;

  /**
   * Initializes native adapter with Hedera client and operator account.
   * @param constructorGuard - Symbol to guard construction access
   * @param params - Configuration with chain and operator credentials
   */
  constructor(
    constructorGuard: symbol,
    {
      contractId,
      chain,
      hederaClient,
      operator,
      ...rest
    }: NativeAdapterParameters
  ) {
    if (!isNativeAddress(contractId)) {
      throw new Error(
        "NativeAdapter requires a native contract id format (0.0.xxxxxx)"
      );
    }

    if (hederaClient instanceof Client && operator) {
      throw new Error(
        "Cannot set both `hederaClient` and `operator`. Only one is allowed."
      );
    }

    super(constructorGuard, { contractId, chain, ...rest });

    if (hederaClient instanceof Client) {
      this.#hClient = hederaClient;
    } else {
      if (this.chain.id === hederaMainnet.id) {
        this.#hClient = Client.forMainnet();
      } else if (this.chain.id === hederaTestnet.id) {
        this.#hClient = Client.forTestnet();
      } else {
        throw new Error(`Unsupported chain: ${this.chain.id}`);
      }

      this.#hClient.setOperator(operator!.accountId, operator!.privateKey);
    }
  }

  /**
   * Creates a new meme token using native Hedera contract execution.
   * @param params - Token creation parameters including metadata and initial buy
   * @returns Promise resolving to transaction receipt
   */
  async create(params: CreateFunctionParameters) {
    const creationFee = await this.getCreationFee();
    const initialBuyAmount = params?.amount ?? 0n;
    const value = creationFee + initialBuyAmount;

    const response = await new ContractExecuteTransaction()
      .setContractId(this.contractId)
      .setGas(400_000)
      .setPayableAmount(Hbar.fromTinybars(Number(value)))
      .setFunction(
        "memeJob",
        new ContractFunctionParameters()
          .addString(params.name)
          .addString(params.symbol)
          .addString(params.memo)
          .addAddress(params.referrer!)
          .addUint256(Number(initialBuyAmount))
          .addBool(params.distributeRewards!)
      )
      .execute(this.#hClient);

    return await response.getReceipt(this.#hClient);
  }

  /**
   * Purchases tokens from bonding curve using native Hedera transactions.
   * @param params - Buy parameters including token address, amount, and referrer
   * @returns Promise resolving to transaction receipt
   */
  async buy(params: BuyFunctionParameters) {
    const amountOut = await this.getAmountOut(
      params.memeAddress,
      params.amount
    );

    const response = await new ContractExecuteTransaction()
      .setContractId(this.contractId)
      .setGas(200_000)
      .setPayableAmount(Hbar.fromTinybars(Number(amountOut)))
      .setFunction(
        "buyJob",
        new ContractFunctionParameters()
          .addAddress(params.memeAddress)
          .addUint256(Number(params.amount))
          .addAddress(params.referrer!)
      )
      .execute(this.#hClient);

    return await response.getReceipt(this.#hClient);
  }

  /**
   * Sells tokens back to bonding curve using native Hedera transactions.
   * @param params - Sell parameters including token address and amount
   * @returns Promise resolving to transaction receipt
   */
  async sell(params: SellFunctionParameters) {
    const response = await new ContractExecuteTransaction()
      .setContractId(this.contractId)
      .setGas(200_000)
      .setFunction(
        "sellJob",
        new ContractFunctionParameters()
          .addAddress(params.memeAddress)
          .addUint256(Number(params.amount))
      )
      .execute(this.#hClient);

    return await response.getReceipt(this.#hClient);
  }

  /**
   * Approves token allowances using native Hedera allowance transactions.
   * @param tokens - Array of tokens and amounts to approve
   * @param spender - Address authorized to spend tokens
   * @returns Promise resolving to allowance transaction receipt
   */
  async approveAllowance(
    tokens: { tokenId: TokenId | string; amount: bigint }[],
    spender: ContractId
  ) {
    const allowanceApproveTransaction =
      new AccountAllowanceApproveTransaction();

    for (const { tokenId, amount } of tokens) {
      allowanceApproveTransaction.approveTokenAllowance(
        typeof tokenId === "string" ? TokenId.fromString(tokenId) : tokenId,
        this.#hClient.operatorAccountId!,
        spender,
        Number(amount)
      );
    }

    const response = await allowanceApproveTransaction.execute(this.#hClient);
    return await response.getReceipt(this.#hClient);
  }

  /**
   * Associates one or more tokens with the current account.
   * @param tokens - Array of tokens (TokenId or string) to associate
   * @returns Promise resolving to transaction receipt
   */
  async associateTokens(tokens: (TokenId | string)[]) {
    const tokenAssociateTransaction = new TokenAssociateTransaction()
      .setAccountId(this.#hClient.operatorAccountId!)
      .setTokenIds(tokens);

    const response = await tokenAssociateTransaction.execute(this.#hClient);
    return await response.getReceipt(this.#hClient);
  }

  /**
   * Retrieves token balance using Hedera Mirror Node API.
   * @param token - MJToken to query balance for
   * @returns Promise resolving to token balance as bigint
   */
  async getBalance(token: MJToken): Promise<bigint> {
    const balancePages = await withRetry(() =>
      MirrorActions.getPaginated({
        client: this.memejob.mirror.client,
        path: "/api/v1/balances",
        options: {
          params: {
            query: {
              "account.id": this.#hClient.operatorAccountId?.toString(),
              limit: 100,
            },
          },
        },
        transform: (page) => {
          if (!page) return [];

          return page.balances?.[0].tokens.filter(
            ({ token_id }) => token_id === token.tokenId.toString()
          );
        },
      })
    );

    const balanceData = balancePages.flat()[0];

    if (balanceData) {
      return BigInt(balanceData.balance);
    }

    return 0n;
  }
}
