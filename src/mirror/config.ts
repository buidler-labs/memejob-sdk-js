import createClient, { ClientOptions } from "openapi-fetch";
import { type MirrorPaths } from "./types";
import { type Chain } from "viem";
import hederaTestnet from "../chains/hedera-testnet";
import { chainToNetworkName } from "../chains";

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
