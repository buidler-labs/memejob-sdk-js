import type { ContractId, TokenId } from "@hashgraph/sdk";
import type { TransactionReceipt as HederaTransactionReceipt } from "@hashgraph/sdk";
import {
  http,
  type Address,
  type Chain,
  type PublicClient,
  type TransactionReceipt as ViemTransactionReceipt,
  createPublicClient,
  getAddress,
} from "viem";
import type { MJClient } from "../MJClient";
import type { MJToken } from "../MJToken";
import { hederaExchangeRatePrecompiledABI, memejobABI } from "../abi";
import { TOKEN_CREATION_FEE, TOKEN_DECIMALS } from "../config";
import type {
  BuyFunctionParameters,
  CreateFunctionParameters,
  SellFunctionParameters,
} from "../types";
import { toEvmAddress } from "../utils/address";
import { MJ_ADAPTER_CONSTRUCTOR_GUARD } from "./create";

/** Base configuration parameters for `MJAdapter` initialization */
export type MJAdapterParameters = {
  /** Memejob client instance */
  client: MJClient;
  /** Network chain configuration */
  chain: Chain;
  /** Memejob contract id */
  contractId: ContractId;
};

/**
 * Abstract base adapter class for interacting with memejob contracts.
 * Provides common functionality and defines interface for concrete implementations.
 */
export abstract class MJAdapter {
  protected memejob: MJClient;
  protected chain: Chain;
  protected publicClient: PublicClient;
  protected contractId: ContractId;

  /**
   * Initializes adapter with client, chain configuration and public client.
   * @param constructorGuard - Symbol to guard direct instantiation.
   * @param params - Configuration parameters for the adapter.
   */
  constructor(
    constructorGuard: symbol,
    { client, chain, contractId }: MJAdapterParameters
  ) {
    if (constructorGuard !== MJ_ADAPTER_CONSTRUCTOR_GUARD) {
      throw new Error(
        "MJAdapter can only be constructed using `createAdapter` function!"
      );
    }

    this.memejob = client;
    this.chain = chain;
    this.contractId = contractId;

    this.publicClient = createPublicClient({
      chain,
      transport: http(),
    });
  }

  /**
   * Creates a new meme token on the network.
   * @param params - Token creation parameters including token info and creation config.
   * @returns Promise resolving to transaction receipt.
   */
  abstract create(
    params: CreateFunctionParameters
  ): Promise<ViemTransactionReceipt | HederaTransactionReceipt>;

  /**
   * Purchases tokens from the bonding curve.
   * @param params - Buy parameters including `amount` and `referrer`.
   * @returns Promise resolving to transaction receipt.
   */
  abstract buy(
    params: BuyFunctionParameters
  ): Promise<ViemTransactionReceipt | HederaTransactionReceipt>;

  /**
   * Sells tokens back to the bonding curve.
   * @param params - Sell parameters including `amount`.
   * @returns Promise resolving to transaction receipt.
   */
  abstract sell(
    params: SellFunctionParameters
  ): Promise<ViemTransactionReceipt | HederaTransactionReceipt>;

  /**
   * Approves token allowances for contract spending.
   * @param tokens - Array of tokens and amounts to approve.
   * @param spender - Contract ID authorized to spend tokens.
   * @returns Promise resolving to transaction receipt(s).
   */
  abstract approveAllowance(
    tokens: { tokenId: TokenId | string; amount: bigint }[],
    spender: ContractId
  ): Promise<ViemTransactionReceipt[] | HederaTransactionReceipt>;

  /**
   * Associates one or more tokens with the current account.
   * @param tokens - Array of tokens to associate.
   * @returns Promise resolving to transaction receipt(s).
   */
  abstract associateTokens(
    tokens: (TokenId | string)[]
  ): Promise<ViemTransactionReceipt[] | HederaTransactionReceipt>;

  /**
   * Retrieves token balance for the current account.
   * @param token - MJToken to query balance for.
   * @returns Promise resolving to token balance as bigint.
   */
  abstract getBalance(token: MJToken): Promise<bigint>;

  /**
   * Retrieves current token creation fee from Hedera exchange rate precompiled contract.
   * @returns Promise resolving to creation fee in tinybars.
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
   * @param address - Address of token to purchase.
   * @param amount - Amount of tokens to buy.
   * @returns Promise resolving to required payment amount.
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
      // no-op on error, return 0n
      return 0n;
    }
  }

  /**
   * Checks whether a given token exists on the memejob bonding curve.
   * @param address - The address of the token to check.
   * @returns Promise resolving to `true` if token exists, `false` otherwise.
   */
  async checkTokenExistence(address: Address): Promise<boolean> {
    try {
      const tokens = (await this.publicClient.readContract({
        address: toEvmAddress(this.contractId),
        abi: memejobABI,
        functionName: "getAllMemeJobs",
      })) as { tokenAddress: Address }[];

      return tokens.some(
        (token) => getAddress(token.tokenAddress) === getAddress(address)
      );
    } catch {
      // no-op on error, assume token does not exist
      return false;
    }
  }
}
