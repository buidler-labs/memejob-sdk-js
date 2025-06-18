import { AccountId, ContractId, PrivateKey } from "@hashgraph/sdk";
import {
  CONTRACT_DEPLOYMENTS,
  createAdapter,
  getChain,
  MJClient,
  NativeAdapter,
} from "@buidlerlabs/memejob-sdk-js";

import "dotenv/config";

(async ({ testnet }: typeof CONTRACT_DEPLOYMENTS) => {
  try {
    console.log("Running native:create...");

    // Validate environment variable for account and private key; if missing, halt execution
    if (!process.env.MJ_ACCOUNT || !process.env.MJ_PRIVATE_KEY) {
      throw new Error("MJ_ACCOUNT or MJ_PRIVATE_KEY missing from .env");
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

    // Performs CREATE transaction to deploy a new token
    const token = await client.createToken({
      name: "test",
      symbol: "TST",
      memo: "ipfs://",
    });

    console.log(token);
    process.exit(0);
  } catch (error) {
    console.error("Failed run native:create task", error);
    process.exit(1);
  }
})(CONTRACT_DEPLOYMENTS);
