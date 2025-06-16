import createClient, { type ClientOptions } from "openapi-fetch";
import type { Chain } from "viem";
import { chainToNetworkName } from "../chains";
import hederaTestnet from "../chains/hedera-testnet";
import type { MirrorPaths } from "./types";

/**
 * Parameters for creating a mirror node API client configuration.
 */
export type CreateMirrorConfigParameters = ClientOptions & {
  /** The chain to connect to (defaults to `hederaTestnet`) */
  chain?: Chain;
};

/**
 * Initializes a mirror node API client configuration.
 *
 * @param baseUrl - The base URL of the mirror node API. If not provided, it's constructed from the chain's network.
 * @param chain - The network's chain configuration (defaults to `hederaTestnet`).
 * @returns An object with `client`, `baseUrl`, and `chain`.
 */
export const createMirrorConfig = ({
  baseUrl,
  chain = hederaTestnet,
}: CreateMirrorConfigParameters = {}) => {
  const network = chainToNetworkName(chain);
  baseUrl = baseUrl || `https://${network}.mirrornode.hedera.com`;

  const client = createClient<MirrorPaths>({
    baseUrl,
  });

  return {
    client,
    baseUrl,
    chain,
  };
};

/**
 * The return type of `createMirrorConfig`.
 */
export type MirrorClientConfig = ReturnType<typeof createMirrorConfig>;
