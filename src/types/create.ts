import type { Address } from "viem";
import type { OperationalMode } from ".";
import type { MJToken } from "../MJToken";

export type MJCreateOptions = {
  amount?: bigint;
  distributeRewards?: boolean;
  referrer?: Address | string;
};

export type MJCreateTokenParameters = {
  name: string;
  symbol: string;
  memo: string;
};

export type CreateFunctionParameters = MJCreateTokenParameters &
  MJCreateOptions;

export type MJCreateReturnType<
  Mode extends OperationalMode,
  Result extends MJToken = MJToken,
> = Mode extends "returnBytes" ? Uint8Array<ArrayBufferLike> : Result;
