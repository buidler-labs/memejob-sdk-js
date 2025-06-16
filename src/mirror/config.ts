import createClient, { type ClientOptions } from "openapi-fetch";
import type { Chain } from "viem";
import { chainToNetworkName } from "../chains";
import hederaTestnet from "../chains/hedera-testnet";
import type { MirrorPaths } from "./types";

export type CreateMirrorConfigParameters = ClientOptions & {
  chain?: Chain;
};

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

export type MirrorClientConfig = ReturnType<typeof createMirrorConfig>;
