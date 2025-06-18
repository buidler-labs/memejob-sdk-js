import { ContractId } from "@hashgraph/sdk";
import { privateKeyToAccount } from "viem/accounts";
import { MJClient } from "../src/MJClient";
import { createAdapter, EvmAdapter } from "../src/adapters";
import { getChain } from "../src/chains";
import { CONTRACT_DEPLOYMENTS } from "../src/config";

import "dotenv/config";

(async ({ testnet }: typeof CONTRACT_DEPLOYMENTS) => {
  // Validate environment variable for private key; if missing, halt execution
  if (!process.env.MJ_PRIVATE_KEY) {
    throw new Error("MJ_PRIVATE_KEY missing from .env");
  }

  // Convert Hedera EVM address into a ContractId
  const contractId = ContractId.fromEvmAddress(0, 0, testnet.evmAddress);

  // Initializes MJClient with a network adapter and chain configuration
  const client = new MJClient(
    createAdapter(EvmAdapter, {
      account: privateKeyToAccount(
        process.env.MJ_PRIVATE_KEY! as `0x${string}`
      ),
    }),
    {
      chain: getChain("testnet"),
      contractId,
    }
  );

  // Retrieve a MJToken wrapper for the specified TokenId
  const token = await client.getToken("0.0.5622410");

  // Perform BUY transaction with specified amount
  const receipt = await token.buy({ amount: 1000000000n });

  console.log({ receipt });
})(CONTRACT_DEPLOYMENTS);
