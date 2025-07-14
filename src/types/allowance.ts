import type { ContractId, TokenId } from "@hashgraph/sdk";
import type { AdapterActionReturnType } from ".";

export type ApproveAllowanceTokens = {
  tokenId: TokenId | string;
  amount: bigint;
}[];

export type MJApproveAllowanceResult = {
  tokens: ApproveAllowanceTokens;
  spender: ContractId;
} & AdapterActionReturnType;
