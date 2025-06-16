import { type ContractId, TokenId } from "@hashgraph/sdk";
import type { Chain } from "viem";
import { MJToken, MJ_TOKEN_CONSTRUCTOR_GUARD } from "./MJToken";
import { MJAdapter } from "./adapters/MJAdapter";
import type { CreateAdapterFunc } from "./adapters/create";
import { ZERO_ADDRESS } from "./constants";
import { type MirrorClientConfig, createMirrorConfig } from "./mirror";
import type {
  CreateFunctionParameters,
  CreateOptions,
  CreateTokenParameters,
} from "./types";
import { toEvmAddress } from "./utils/address";

/**
 * Configuration options for `MJClient` initialization.
 */
export type MJClientConfig = {
  /** Memejob contract id */
  contractId: ContractId;
  /** Network chain configuration */
  chain: Chain;
  /** Base URL for `Hedera Mirror Node API` */
  mirrorBaseUrl?: string;
};

/**
 * Main client for interacting with memejob contracts.
 * Handles token creation, trading operations, and mirror queries.
 */
export class MJClient<Adapter extends MJAdapter = MJAdapter> {
  #adapter: Adapter;
  #mirror: MirrorClientConfig;
  #contractId!: ContractId;

  /**
   * Creates a new `MJClient` instance.
   * @param adapter - Network adapter for contract interactions (`Native` or `EVM`)
   * @param config - Client configuration
   */
  constructor(
    createAdapterFunc: CreateAdapterFunc<Adapter>,
    config: MJClientConfig
  ) {
    this.#contractId = config?.contractId ?? this.#contractId;

    this.#adapter = createAdapterFunc(this, {
      chain: config.chain,
      contractId: this.#contractId,
    });

    if (!(this.#adapter instanceof MJAdapter)) {
      throw new Error("Network adapter not properly configured.");
    }

    this.#mirror = createMirrorConfig({
      chain: config.chain,
      baseUrl: config?.mirrorBaseUrl,
    });
  }

  /**
   * Creates a new token on memejob.
   * @param tokenParams - Token creation parameters
   * @param options - Optional creation parameters
   * @returns Promise resolving to transaction receipt
   * @throws Error if required token fields are missing
   */
  async createToken(
    tokenParams: CreateTokenParameters,
    options?: CreateOptions
  ) {
    if (!tokenParams.name) throw new Error("Token name is required.");
    if (!tokenParams.symbol) throw new Error("Token symbol is required.");
    if (!tokenParams.memo) throw new Error("Token memo is required.");

    const params: CreateFunctionParameters = {
      name: tokenParams.name,
      symbol: tokenParams.symbol,
      memo: tokenParams.memo,
      referrer: options?.referrer ?? ZERO_ADDRESS,
      amount: options?.amount ?? 0n,
      distributeRewards: options?.distributeRewards || true,
    };

    return await this.#adapter.create(params);
  }

  /**
   * Retrieves a MJToken instance if it's found on bonding curve.
   * @param tokenId - Token id as string or `TokenId`.
   * @returns Promise that resolves to an MJToken instance.
   * @throws Error if the specified token is not present on the bonding curve.
   */
  async getToken(tokenId: TokenId | string): Promise<MJToken> {
    const isMJToken = await this.#adapter.checkTokenExistence(
      toEvmAddress(
        typeof tokenId === "string" ? TokenId.fromString(tokenId) : tokenId
      )
    );

    if (!isMJToken) {
      throw new Error("Token not found on memejob bonding curve.");
    }

    return new MJToken(MJ_TOKEN_CONSTRUCTOR_GUARD, {
      client: this,
      token_id: tokenId,
    });
  }

  /**
   * Gets the configured Network Adapter.
   * @returns MJAdapter
   */
  get adapter() {
    return this.#adapter;
  }

  /**
   * Gets the configured `Mirror Node Client` for network queries.
   * @returns Mirror client configuration
   */
  get mirror() {
    return this.#mirror;
  }

  /**
   * Gets the configured contract id.
   * @returns memejob ContractId
   */
  get contractId() {
    return this.#contractId;
  }
}
