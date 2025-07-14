import { type ContractId, TransactionId } from "@hashgraph/sdk";
import {
  http,
  type Address,
  type Chain,
  type PublicClient,
  createPublicClient,
} from "viem";
import { MirrorActions, type MirrorClientConfig } from "..";
import type { MJToken } from "../MJToken";
import { hederaExchangeRatePrecompiledABI, memejobABI } from "../abi";
import { TOKEN_CREATION_FEE, TOKEN_DECIMALS } from "../config";
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
} from "../types";
import { toEvmAddress } from "../utils";
import { MJ_ADAPTER_CONSTRUCTOR_GUARD } from "./create";

/**
 * Base configuration parameters for `MJAdapter` initialization.
 *
 * @template Mode - The operational mode type
 */
export type MJAdapterParameters<
  Mode extends OperationalMode = OperationalMode,
> = {
  /** MirrorNode client configuration for interacting with Hedera mirror nodes */
  mirror: MirrorClientConfig;
  /** Network chain configuration specifying the blockchain network */
  chain: Chain;
  /** Memejob contract identifier on the Hedera network */
  contractId: ContractId;
  /**
   * Adapter operational mode that determines return types
   * @defaultValue "returnResult"
   */
  operationalMode?: Mode;
};

/**
 * Abstract base adapter class for interacting with memejob contracts.
 * Provides common functionality and defines interface for concrete implementations.
 *
 * This class serves as the foundation for all memejob contract interactions,
 * including token creation, buying, selling, and other account operations such us asoociate tokens or approve allowance.
 *
 * @template Mode - The operational mode that determines return types
 */
export abstract class MJAdapter<
  Mode extends OperationalMode = OperationalMode,
> {
  /** The operational mode determining return types for adapter methods */
  readonly operationalMode: Mode;

  /** MirrorNode client configuration for network queries */
  protected mirror: MirrorClientConfig;
  /** Chain configuration */
  protected chain: Chain;
  /** Public client for reading contract state */
  protected publicClient: PublicClient;
  /** Contract identifier for the memejob contract */
  protected contractId: ContractId;

  /**
   * Initializes adapter with client, chain configuration and public client.
   *
   * @param constructorGuard - Symbol to guard direct instantiation and enforce factory pattern
   * @param params - Configuration parameters for the adapter
   * @throws {Error} When constructor guard is invalid (direct instantiation attempted)
   *
   * @internal
   */
  constructor(
    constructorGuard: symbol,
    { chain, contractId, mirror, operationalMode }: MJAdapterParameters<Mode>
  ) {
    if (constructorGuard !== MJ_ADAPTER_CONSTRUCTOR_GUARD) {
      throw new Error(
        "MJAdapter can only be constructed using `createAdapter` function!"
      );
    }

    this.mirror = mirror;
    this.chain = chain;
    this.contractId = contractId;
    this.operationalMode = operationalMode ?? ("returnResult" as Mode);

    this.publicClient = createPublicClient({
      chain,
      transport: http(),
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
  abstract create(
    params: CreateFunctionParameters
  ): Promise<MJAdapterReturnType<Mode, `0.0.${number}`>>;

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
  abstract buy(
    params: MJBuyFunctionParameters
  ): Promise<MJAdapterReturnType<Mode, MJBuyResult>>;

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
  abstract sell(
    params: MJSellFunctionParameters
  ): Promise<MJAdapterReturnType<Mode, MJSellResult>>;

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
  abstract approveAllowance(
    tokens: ApproveAllowanceTokens,
    spender: ContractId
  ): Promise<
    | MJAdapterReturnType<Mode, MJApproveAllowanceResult>
    | MJAdapterReturnType<Mode, MJApproveAllowanceResult>[]
  >;

  /**
   * Associates one or more tokens with the current account.
   *
   * On Hedera, accounts must be associated with tokens before they can
   * receive or hold them. This method performs the association transaction.
   *
   * @param tokens - Array of token identifiers to associate with the account
   * @returns Promise resolving to transaction bytes or MJAssociateTokensResult based on operational mode
   */
  abstract associateTokens(
    tokens: AssociateTokensList
  ): Promise<
    | MJAdapterReturnType<Mode, MJAssociateTokensResult>
    | MJAdapterReturnType<Mode, MJAssociateTokensResult>[]
  >;

  /**
   * Retrieves token balance for the current account.
   *
   * Queries the account's balance for the specified token. The balance
   * is returned in the token's smallest unit (tiny).
   *
   * @param token - MJToken instance to query balance for
   * @returns Promise resolving to token balance as bigint in smallest unit
   */
  abstract getBalance(token: MJToken): Promise<bigint>;

  /**
   * Retrieves current token creation fee from Hedera exchange rate precompiled contract.
   *
   * Queries the Hedera network for the current fee required to create a new token.
   * The fee is dynamic and based on current USD exchange rates.
   *
   * @returns Promise resolving to creation fee in tinybars
   */
  async getCreationFee(): Promise<bigint> {
    const contractAddress =
      "0x0000000000000000000000000000000000000168" as const;

    try {
      const _creationFee = (await this.publicClient.readContract({
        address: contractAddress,
        abi: hederaExchangeRatePrecompiledABI,
        functionName: "tinycentsToTinybars",
        args: [100n * 10n ** BigInt(TOKEN_DECIMALS)],
      })) as bigint;

      return _creationFee;
    } catch (error) {
      console.error("Failed to get token creation fee", error);
      return BigInt(TOKEN_CREATION_FEE) * 10n ** BigInt(TOKEN_DECIMALS);
    }
  }

  /**
   * Calculates expected output amount for token purchase.
   *
   * Simulates a buy transaction to determine how much HBAR
   * would be required to purchase the specified amount of tokens
   * at the current bonding curve price.
   *
   * @param address - EVM address of the token to purchase
   * @param amount - Amount of tokens to buy (in wei/smallest unit)
   * @returns Promise resolving to required payment amount in base currency
   */
  async getAmountOut(address: Address, amount: bigint): Promise<bigint> {
    const contractAddress = toEvmAddress(this.contractId);

    try {
      const _outputAmount = (await this.publicClient.readContract({
        address: contractAddress,
        abi: memejobABI,
        functionName: "getAmountOut",
        args: [address, amount, 0], // 0 = buy in meme tokens
      })) as bigint;

      return _outputAmount;
    } catch {
      // no-op, return 0n
      return 0n;
    }
  }

  /**
   * Checks whether a given token exists on the memejob bonding curve.
   *
   * Verifies if a token address is registered in the memejob contract,
   * indicating it's available for trading on the bonding curve.
   *
   * @param address - The EVM address of the token to check
   * @returns Promise resolving to `true` if token exists and is tradeable, `false` otherwise
   */
  async checkTokenExistence(address: Address): Promise<boolean> {
    try {
      const token = (await this.publicClient.readContract({
        address: toEvmAddress(this.contractId),
        abi: memejobABI,
        functionName: "addressToMemeTokenMapping",
        args: [address],
      })) as { tokenAddress: Address };

      return !!token;
    } catch {
      // no-op, return false. Assume token does not exist
      return false;
    }
  }

  /**
   * Retrieves the token ID after a successful token creation transaction.
   *
   * Queries the Hedera mirror node to find the token creation transaction
   * and extract the newly created token's ID from the transaction results.
   *
   * @param transactionIdOrHash - Transaction ID or hash of the token creation transaction
   * @returns Promise resolving to the created token ID in format `0.0.${number}`
   * @throws {Error} When transaction results cannot be retrieved
   */
  protected async getTokenIdOnCreate(
    transactionIdOrHash: TransactionId | string
  ): Promise<`0.0.${number}`> {
    let mirrorTransactionIdOrHash = "";

    if (transactionIdOrHash instanceof TransactionId) {
      const [account, ts] = transactionIdOrHash.toString().split("@");
      mirrorTransactionIdOrHash = `${account}-${ts.replace(".", "-")}`;
    } else {
      mirrorTransactionIdOrHash = transactionIdOrHash;
    }

    const contractResults = await MirrorActions.get({
      client: this.mirror.client,
      path: "/api/v1/contracts/results/{transactionIdOrHash}",
      options: {
        params: {
          path: {
            transactionIdOrHash: mirrorTransactionIdOrHash,
          },
        },
      },
      retryOptions: {
        retryCount: 10,
        delay: 2000,
      },
    });

    if (!contractResults) throw new Error("Failed to get contract results.");

    const transactionsResponse = await MirrorActions.get({
      client: this.mirror.client,
      path: "/api/v1/transactions",
      options: {
        params: {
          query: {
            timestamp: [contractResults.timestamp!],
          },
        },
      },
    });

    if (!transactionsResponse || !transactionsResponse?.transactions?.length) {
      throw new Error("Failed to get transactions by timestamp.");
    }

    const firstTransaction = transactionsResponse?.transactions?.[0];
    const transactionId = firstTransaction.transaction_id;

    const transactionsById = await MirrorActions.get({
      client: this.mirror.client,
      path: "/api/v1/transactions/{transactionId}",
      options: {
        params: {
          path: {
            transactionId: transactionId!,
          },
        },
      },
    });

    const tokenCreationTransaction = transactionsById?.transactions?.find(
      ({ name }) => name === "TOKENCREATION"
    );

    if (!transactionsResponse || !transactionsResponse?.transactions?.length) {
      throw new Error("Couldn't find token creation transaction.");
    }

    return tokenCreationTransaction?.entity_id as `0.0.${number}`;
  }
}
