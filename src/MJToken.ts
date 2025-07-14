import { TokenId } from "@hashgraph/sdk";
import type { MJClient } from "./MJClient";
import { ZERO_ADDRESS } from "./config";
import type {
  MJBuyConfig,
  MJBuyFunctionParameters,
  MJSellConfig,
  MJSellFunctionParameters,
} from "./types";

export const MJ_TOKEN_CONSTRUCTOR_GUARD = Symbol("MJ_TOKEN_CONSTRUCTOR_GUARD");

/**
 * Represents a memejob token with trading capabilities.
 * Encapsulates basic token info and provides methods for contract interactions.
 */
export class MJToken<Client extends MJClient = MJClient> {
  #tokenId!: TokenId;
  #client: Client;

  /**
   * Creates a new `MJToken` instance with basic info.
   * @param constructorGuard - Symbol to restrict direct construction
   * @param TokenConfig - Token config parameters including `client` instance and token id
   */
  public constructor(
    constructorGuard: symbol,
    {
      client,
      token_id,
    }: { client: Client; token_id: TokenId | `0.0.${number}` }
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
   * @returns Promise resolving to transaction bytes or MJBuyResult based on operational mode
   * @throws Error if `amount` is not specified
   */
  async buy(config: MJBuyConfig) {
    if (!config.amount) throw new Error("Amount config is required.");

    const params: MJBuyFunctionParameters = {
      memeAddress: `0x${this.#tokenId.toSolidityAddress()}`,
      amount: config.amount,
      referrer: config.referrer ?? ZERO_ADDRESS,
    };

    if (config.autoAssociate) {
      await this.associate();
    }

    return this.#client.adapter.buy(params) as ReturnType<
      Client["adapter"]["buy"]
    >;
  }

  /**
   * Sells tokens back to the bonding curve.
   * @param config - Sell configuration including `amount` and optional `instant` flag (auto approve allowance on demand)
   * @returns Promise resolving to transaction bytes or MJSellResult based on operational mode
   * @throws Error if `amount` is not specified
   */
  async sell(config: MJSellConfig) {
    if (!config.amount) throw new Error("Amount config is required.");

    const params: MJSellFunctionParameters = {
      memeAddress: `0x${this.#tokenId.toSolidityAddress()}`,
      amount: config.amount,
    };

    if (config.instant) {
      await this.approveAllowance(config.amount);
    }

    return this.#client.adapter.sell(params) as ReturnType<
      Client["adapter"]["sell"]
    >;
  }

  /**
   * Approves a token allowance to allow the MemeJob contract to spend funds on your behalf.
   * @param amount - The amount of tokens that can be spent.
   * @returns Promise resolving to transaction bytes or MJApproveAllowanceResult based on operational mode
   */
  async approveAllowance(amount: bigint) {
    return this.#client.adapter.approveAllowance(
      [{ tokenId: this.#tokenId, amount }],
      this.#client.contractId
    ) as ReturnType<Client["adapter"]["approveAllowance"]>;
  }

  /**
   * Associates the token with the current account.
   * @returns Promise resolving to transaction bytes or MJAssociateTokensResult based on operational mode
   */
  async associate() {
    return this.#client.adapter.associateTokens([this.#tokenId]) as ReturnType<
      Client["adapter"]["associateTokens"]
    >;
  }

  /**
   * Retrieves the token balance for the current account.
   * @returns Promise resolving to token balance as a `bigint`.
   */
  async getBalance() {
    return this.#client.adapter.getBalance(this) as ReturnType<
      Client["adapter"]["getBalance"]
    >;
  }

  /**
   * Gets the token ID.
   * @returns `TokenId` instance
   */
  get tokenId() {
    return this.#tokenId;
  }
}
