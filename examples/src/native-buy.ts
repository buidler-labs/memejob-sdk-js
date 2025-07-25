import {
  CONTRACT_DEPLOYMENTS,
  MJClient,
  NativeAdapter,
  createAdapter,
  getChain,
} from "@buidlerlabs/memejob-sdk-js";
import { AccountId, ContractId, PrivateKey } from "@hashgraph/sdk";

import "dotenv/config";

(async ({ testnet }: typeof CONTRACT_DEPLOYMENTS) => {
  try {
    console.log("Running native:buy...");

    // Validate environment variable for account, private key and test token id; if missing, halt execution
    if (
      !process.env.MJ_ACCOUNT ||
      !process.env.MJ_PRIVATE_KEY ||
      !process.env.MJ_TOKEN_ID
    ) {
      throw new Error(
        "MJ_ACCOUNT, MJ_PRIVATE_KEY or MJ_TOKEN_ID missing from .env"
      );
    }

    // Convert Hedera EVM address into a ContractId
    const contractId = ContractId.fromString(testnet.contractId);

    // Initializes MJClient with a network adapter and chain configuration
    const client = new MJClient(
      createAdapter(NativeAdapter, {
        operator: {
          accountId: AccountId.fromString(process.env.MJ_ACCOUNT!),
          privateKey: PrivateKey.fromStringECDSA(process.env.MJ_PRIVATE_KEY!),
        },
      }),
      {
        chain: getChain("testnet"),
        contractId,
      }
    );

    // Retrieve a MJToken wrapper for the specified TokenId
    const token = await client.getToken(
      process.env.MJ_TOKEN_ID as `0.0.${number}`
    );

    // Perform BUY transaction with specified amount
    const result = await token.buy({
      amount: 1100000000n,
    });

    console.log({ result });
    process.exit(0);
  } catch (error) {
    console.error("Failed run native:buy task", error);
    process.exit(1);
  }
})(CONTRACT_DEPLOYMENTS);
