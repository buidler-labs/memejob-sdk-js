export type OperationalMode = "returnBytes" | "returnResult";

export type AdapterActionReturnType = {
  status: string;
  transactionIdOrHash: string;
};

export type MJAdapterReturnType<
  Mode extends OperationalMode,
  Result,
> = Mode extends "returnBytes" ? Uint8Array<ArrayBufferLike> : Result;
