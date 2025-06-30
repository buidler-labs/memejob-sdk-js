import {
  CONTRACT_DEPLOYMENTS,
  MJClient,
  NativeAdapter,
  createAdapter,
  getChain,
} from "@buidlerlabs/memejob-sdk-js";
import { AccountId, Client, ContractId, PrivateKey } from "@hashgraph/sdk";

import "dotenv/config";

(async ({ testnet }: typeof CONTRACT_DEPLOYMENTS) => {
  try {
    console.log("Running native:external-client...");

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

    const contractId = ContractId.fromString(testnet.contractId);
    const hederaClient = Client.forTestnet();

    hederaClient.setOperator(
      AccountId.fromString(process.env.MJ_ACCOUNT!),
      PrivateKey.fromStringECDSA(process.env.MJ_PRIVATE_KEY!)
    );

    const client = new MJClient(
      createAdapter(NativeAdapter, {
        hederaClient,
      }),
      {
        chain: getChain("testnet"),
        contractId,
      }
    );

    const token = await client.getToken(process.env.MJ_TOKEN_ID);

    const receipt = await token.buy({
      amount: 1000000000n,
    });

    console.log({ receipt });
    process.exit(0);
  } catch (error) {
    console.error("Failed run native:external-client task", error);
    process.exit(1);
  }
})(CONTRACT_DEPLOYMENTS);
