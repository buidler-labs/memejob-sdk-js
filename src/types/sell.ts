import type { Address } from "viem";
import type { AdapterActionReturnType } from ".";

export type MJSellFunctionParameters = {
  memeAddress: Address;
  amount: bigint;
};

export type MJSellConfig = Pick<MJSellFunctionParameters, "amount"> & {
  instant?: boolean;
};

export type MJSellResult = {
  amount: bigint;
} & AdapterActionReturnType;
