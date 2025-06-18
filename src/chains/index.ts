import type { Chain } from "viem";
import mainnet from "./hedera-mainnet";
import testnet from "./hedera-testnet";

export const SUPPORTED_CHAINS = {
  mainnet,
  testnet,
};

export const getChain = (
  chain: keyof typeof SUPPORTED_CHAINS,
  config?: { rpcUrl?: string }
) => {
  const selection = { ...SUPPORTED_CHAINS[chain] };

  if (config?.rpcUrl) {
    selection.rpcUrls.default.http = [config.rpcUrl];
  }

  return selection;
};

export const chainToNetworkName = (chain: Chain) => {
  return {
    [mainnet.id]: "mainnet",
    [testnet.id]: "testnet",
  }[chain.id];
};
