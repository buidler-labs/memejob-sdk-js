import type { TokenId } from "@hashgraph/sdk";
import type { AdapterActionReturnType } from ".";

export type AssociateTokensList = (TokenId | string)[];

export type MJAssociateTokensResult = {
  tokens: AssociateTokensList;
} & AdapterActionReturnType;
