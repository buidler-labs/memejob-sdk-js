import {
  CONTRACT_DEPLOYMENTS,
  EvmAdapter,
  MJClient,
  MJMemoBuilder,
  PinataService,
  createAdapter,
  getChain,
} from "@buidlerlabs/memejob-sdk-js";
import { ContractId } from "@hashgraph/sdk";
import { privateKeyToAccount } from "viem/accounts";
import { readImageAsBlob } from "./utils/fs-utils";

import "dotenv/config";

(async ({ testnet }: typeof CONTRACT_DEPLOYMENTS) => {
  try {
    console.log("Running evm:create...");

    // Validate environment variable for private key; if missing, halt execution
    if (!process.env.MJ_PRIVATE_KEY) {
      throw new Error("MJ_PRIVATE_KEY missing from .env");
    }

    // Validate IPFS credentials; if missing, halt execution
    if (!process.env.IPFS_GATEWAY || !process.env.PINATA_JWT) {
      throw new Error("IPFS_GATEWAY or PINATA_JWT missing from .env");
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

    // Initializes MJMemoBuilder with Pinata service for metadata storage
    const memoBuilder = new MJMemoBuilder(
      new PinataService({
        gatewayUrl: `https://${process.env.IPFS_GATEWAY}`,
        jwt: process.env.PINATA_JWT!,
      })
    );

    // Stores token metadata to IPFS
    const memo = await memoBuilder.upload({
      description: "my awesome token description",
      creator: "0.0.123456",
      image: readImageAsBlob("./assets/memejob-agent.png"),
      properties: { twitter: "https://x.com/test" },
    });

    // Performs CREATE transaction to deploy a new token
    const token = await client.createToken(
      { name: "test", symbol: "TST", memo },
      { distributeRewards: false }
    );

    console.log({ token });
    process.exit(0);
  } catch (error) {
    console.error("Failed run evm:create task", error);
    process.exit(1);
  }
})(CONTRACT_DEPLOYMENTS);
