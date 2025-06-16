import type { Address } from "viem";

export type CreateOptions = {
  amount?: bigint;
  distributeRewards?: boolean;
  referrer?: Address | string;
};

export type CreateTokenParameters = {
  name: string;
  symbol: string;
  memo: string;
};

export type CreateFunctionParameters = CreateTokenParameters & CreateOptions;
