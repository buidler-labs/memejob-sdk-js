import { TokenId } from "@hashgraph/sdk";
import type { MJClient } from "./MJClient";
import { ZERO_ADDRESS } from "./config";
import type {
  BuyConfig,
  BuyFunctionParameters,
  SellConfig,
  SellFunctionParameters,
} from "./types";

export const MJ_TOKEN_CONSTRUCTOR_GUARD = Symbol("MJ_TOKEN_CONSTRUCTOR_GUARD");

/**
 * Represents a memejob token with trading capabilities.
 * Encapsulates basic token info and provides methods for contract interactions.
 */
export class MJToken {
  #tokenId!: TokenId;
  #client: MJClient;

  /**
   * Creates a new `MJToken` instance with basic info.
   * @param constructorGuard - Symbol to restrict direct construction
   * @param TokenConfig - Token config parameters including `client` instance and token id
   */
  public constructor(
    constructorGuard: symbol,
    { client, token_id }: { client: MJClient; token_id: TokenId | string }
  ) {
    if (constructorGuard !== MJ_TOKEN_CONSTRUCTOR_GUARD) {
      throw new Error(
        "MJToken can only be constructed using a MJClient instance!"
      );
    }

    this.#client = client;
    this.#tokenId =
      token_id instanceof TokenId ? token_id : TokenId.fromString(token_id);
  }

  /**
   * Purchases tokens from the bonding curve.
   * @param config - Buy configuration including `amount` and optional `referrer` and `autoAssociate`
   * @returns Promise resolving to transaction receipt
   * @throws Error if `amount` is not specified
   */
  async buy(config: BuyConfig) {
    if (!config.amount) throw new Error("Amount config is required.");

    const params: BuyFunctionParameters = {
      memeAddress: `0x${this.#tokenId.toSolidityAddress()}`,
      amount: config.amount,
      referrer: config.referrer ?? ZERO_ADDRESS,
    };

    if (config.autoAssociate) {
      await this.associate();
    }

    return this.#client.adapter.buy(params);
  }

  /**
   * Sells tokens back to the bonding curve.
   * @param config - Sell configuration including `amount` and optional `instant` flag (auto approve allowance on demand)
   * @returns Promise resolving to transaction receipt
   * @throws Error if `amount` is not specified
   */
  async sell(config: SellConfig) {
    if (!config.amount) throw new Error("Amount config is required.");

    const params: SellFunctionParameters = {
      memeAddress: `0x${this.#tokenId.toSolidityAddress()}`,
      amount: config.amount,
    };

    if (config.instant) {
      await this.approveAllowance(config.amount);
    }

    return this.#client.adapter.sell(params);
  }

  /**
   * Approves a token allowance to allow the MemeJob contract to spend funds on your behalf.
   * @param amount - The amount of tokens that can be spent.
   * @returns Promise resolving to approval transaction receipt.
   */
  async approveAllowance(amount: bigint) {
    return this.#client.adapter.approveAllowance(
      [{ tokenId: this.#tokenId, amount }],
      this.#client.contractId
    );
  }

  /**
   * Associates the token with the current account.
   * @returns Promise resolving to associate transaction receipt.
   */
  async associate() {
    return this.#client.adapter.associateTokens([this.#tokenId]);
  }

  /**
   * Retrieves the token balance for the current account.
   * @returns Promise resolving to token balance as a `bigint`.
   */
  async getBalance() {
    return this.#client.adapter.getBalance(this);
  }

  /**
   * Gets the token ID.
   * @returns `TokenId` instance
   */
  get tokenId() {
    return this.#tokenId;
  }
}
