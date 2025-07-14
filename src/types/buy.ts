import type { Address } from "viem";
import type { AdapterActionReturnType } from "./adapter";

export type MJBuyFunctionParameters = {
  memeAddress: Address;
  amount: bigint;
  referrer?: `0x${string}`;
};

export type MJBuyConfig = Pick<
  MJBuyFunctionParameters,
  "amount" | "referrer"
> & {
  autoAssociate?: boolean;
};

export type MJBuyResult = {
  amount: bigint;
} & AdapterActionReturnType;
