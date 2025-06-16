import type { Chain } from "viem";
import mainnet from "./hedera-mainnet";
import testnet from "./hedera-testnet";

export const defaults = {
  mainnet,
  testnet,
};

export const getChain = (
  chain: keyof typeof defaults,
  config?: { rpcUrl?: string }
) => {
  const selection = { ...defaults[chain] };

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
