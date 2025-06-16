import type { Address } from "viem";

export type SellFunctionParameters = {
  memeAddress: Address;
  amount: bigint;
};

export type SellConfig = Pick<SellFunctionParameters, "amount"> & {
  instant?: boolean;
};
