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
import { isNativeAddress } from "../../utils";
import { MJAdapter, type MJAdapterParameters } from "../MJAdapter";

/** Configuration parameters for NativeAdapter initialization */
export type NativeAdapterParameters<Mode extends OperationalMode> =
  MJAdapterParameters<Mode> &
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
 * Native Hedera SDK adapter for interacting with memejob contracts.
 * Uses Hedera SDK directly for transaction execution and queries.
 */
export class NativeAdapter<
  Mode extends OperationalMode = OperationalMode,
> extends MJAdapter<Mode> {
  #hClient!: Client;

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
    }: NativeAdapterParameters<Mode>
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
    } else if (operator?.accountId && operator.privateKey) {
      if (this.chain.id === hederaMainnet.id) {
        this.#hClient = Client.forMainnet();
      } else if (this.chain.id === hederaTestnet.id) {
        this.#hClient = Client.forTestnet();
      } else {
        throw new Error(`Unsupported chain: ${this.chain.id}`);
      }

      this.#hClient.setOperator(operator!.accountId, operator!.privateKey);
    } else if (this.operationalMode === "returnBytes") {
      //no-op
    } else {
      throw new Error(
        "Failed to initialize NativeAdapter. Provide either a `hederaClient`, an `operator`, or set `returnBytes: true` in the client config."
      );
    }
  }

  /**
   * Creates a new meme token using native Hedera contract execution.
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
    const value = creationFee + initialBuyAmount;

    const tx = new ContractExecuteTransaction()
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
      );

    if (this.operationalMode === "returnBytes") {
      return tx.toBytes() as R;
    }

    const response = await tx.execute(this.#hClient);
    await response.getReceipt(this.#hClient);

    return (await this.getTokenIdOnCreate(response.transactionId)) as R;
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

    const tx = new ContractExecuteTransaction()
      .setContractId(this.contractId)
      .setGas(200_000)
      .setPayableAmount(Hbar.fromTinybars(Number(amountOut)))
      .setFunction(
        "buyJob",
        new ContractFunctionParameters()
          .addAddress(params.memeAddress)
          .addUint256(Number(params.amount))
          .addAddress(params.referrer!)
      );

    if (this.operationalMode === "returnBytes") {
      return tx.toBytes() as R;
    }

    const response = await tx.execute(this.#hClient);
    const receipt = await response.getReceipt(this.#hClient);

    return {
      transactionIdOrHash: response.transactionId.toString(),
      status: receipt.status.toString().toLowerCase(),
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
    const tx = new ContractExecuteTransaction()
      .setContractId(this.contractId)
      .setGas(200_000)
      .setFunction(
        "sellJob",
        new ContractFunctionParameters()
          .addAddress(params.memeAddress)
          .addUint256(Number(params.amount))
      );

    if (this.operationalMode === "returnBytes") {
      return tx.toBytes() as R;
    }

    const response = await tx.execute(this.#hClient);
    const receipt = await response.getReceipt(this.#hClient);

    return {
      transactionIdOrHash: response.transactionId.toString(),
      status: receipt.status.toString().toLowerCase(),
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
  >(tokens: ApproveAllowanceTokens, spender: ContractId): Promise<R> {
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

    if (this.operationalMode === "returnBytes") {
      return allowanceApproveTransaction.toBytes() as R;
    }

    const response = await allowanceApproveTransaction.execute(this.#hClient);
    const receipt = await response.getReceipt(this.#hClient);

    return {
      transactionIdOrHash: response.transactionId.toString(),
      status: receipt.status.toString().toLowerCase(),
      tokens,
      spender,
    } satisfies MJApproveAllowanceResult as R;
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
  >(tokens: AssociateTokensList): Promise<R> {
    const tokenAssociateTransaction = new TokenAssociateTransaction()
      .setAccountId(this.#hClient.operatorAccountId!)
      .setTokenIds(tokens);

    if (this.operationalMode === "returnBytes") {
      return tokenAssociateTransaction.toBytes() as R;
    }

    const response = await tokenAssociateTransaction.execute(this.#hClient);
    const receipt = await response.getReceipt(this.#hClient);

    return {
      transactionIdOrHash: response.transactionId.toString(),
      status: receipt.status.toString().toLowerCase(),
      tokens,
    } satisfies MJAssociateTokensResult as R;
  }

  /**
   * Retrieves token balance for the current account using Hedera Mirror Node API.
   *
   * Queries the account's balance for the specified token. The balance
   * is returned in the token's smallest unit (tiny).
   *
   * @param token - MJToken instance to query balance for
   * @returns Promise resolving to token balance as bigint in smallest unit
   */
  async getBalance(token: MJToken): Promise<bigint> {
    const balancePages = await MirrorActions.getPaginated({
      client: this.mirror.client,
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
    });

    const balanceData = balancePages.flat()[0];

    if (balanceData) {
      return BigInt(balanceData.balance);
    }

    return 0n;
  }
}
