import { AccountId, Client, ContractId, PrivateKey } from "@hashgraph/sdk";
import { MJClient } from "../src/MJClient";
import { NativeAdapter } from "../src/adapters";
import { createAdapter } from "../src/adapters/create";
import { getChain } from "../src/chains";
import { CONTRACT_DEPLOYMENTS } from "../src/config";

import "dotenv/config";

(async ({ testnet }: typeof CONTRACT_DEPLOYMENTS) => {
  // Validate environment variable for account and private key; if missing, halt execution
  if (!process.env.MJ_ACCOUNT || !process.env.MJ_PRIVATE_KEY) {
    throw new Error("MJ_ACCOUNT or MJ_PRIVATE_KEY missing from .env");
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

  const token = await client.getToken("0.0.5622410");

  const receipt = await token.sell({
    amount: 1000000000n,
    instant: true,
  });

  console.log({ receipt });
})(CONTRACT_DEPLOYMENTS);
