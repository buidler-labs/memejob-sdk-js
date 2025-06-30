import {
  CONTRACT_DEPLOYMENTS,
  EvmAdapter,
  MJClient,
  createAdapter,
  getChain,
} from "@buidlerlabs/memejob-sdk-js";
import { ContractId } from "@hashgraph/sdk";
import { privateKeyToAccount } from "viem/accounts";

import "dotenv/config";

(async ({ testnet }: typeof CONTRACT_DEPLOYMENTS) => {
  try {
    console.log("Running evm:sell...");

    // Validate environment variables for private key and test token id; if missing, halt execution
    if (!process.env.MJ_PRIVATE_KEY || !process.env.MJ_TOKEN_ID) {
      throw new Error("MJ_PRIVATE_KEY or MJ_TOKEN_ID missing from .env");
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
    const token = await client.getToken(process.env.MJ_TOKEN_ID);

    // Perform SELL transaction with specified amount
    const receipt = await token.sell({
      amount: 1000000000n,
      instant: true,
    });

    console.log({ receipt });
    process.exit(0);
  } catch (error) {
    console.error("Failed run evm:sell task", error);
    process.exit(1);
  }
})(CONTRACT_DEPLOYMENTS);
