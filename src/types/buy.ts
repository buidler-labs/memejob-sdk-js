import type { Address } from "viem";

export type BuyFunctionParameters = {
  memeAddress: Address;
  amount: bigint;
  referrer?: `0x${string}`;
};

export type BuyConfig = Pick<BuyFunctionParameters, "amount" | "referrer"> & {
  autoAssociate?: boolean;
};
