# memejob-sdk-js

Welcome to the official [memejob](https://memejob.fun) SDK documentation! This provides a powerful and easy-to-use interface for interacting with the memejob protocol on Hedera.

## Overview

The SDK is designed to simplify the integration of [memejob](https://memejob.fun) functionality into your applications. It provides a comprehensive set of tools for:

- Creating and managing tokens
- Executing buy and sell operations
- Managing allowances
- Managing token associations

## Documentation

Full documentation page: [memejob-sdk-js - Docs](https://buidler-labs.github.io/memejob-sdk-js/)

## Prerequisites

Before you begin, make sure you have:

- [Node.js](https://nodejs.org/) (v18 or higher)
- A package manager ([npm](https://npmjs.com), [pnpm](https://pnpm.io/) or other)
- A [Hedera](https://hedera.com/) account with sufficient HBAR for transactions

## Installation

```sh [npm]
$ npm i @buidlerlabs/memejob-sdk-js @hashgraph/sdk viem
```

or

```sh [npm]
$ pnpm add @buidlerlabs/memejob-sdk-js @hashgraph/sdk viem
```

## Usage

Setup a new memejob client

```typescript [@hashgraph/sdk]
import { AccountId, ContractId, PrivateKey } from "@hashgraph/sdk";
import {
  createAdapter,
  getChain,
  MJClient,
  NativeAdapter,
} from "@buidlerlabs/memejob-sdk-js";

const contractId = ContractId.fromString("0.0.123456");

const client = new MJClient(
  createAdapter(NativeAdapter, {
    operator: {
      accountId: AccountId.fromString("0.0.123456"),
      privateKey: PrivateKey.fromStringED25519("<private-key>"),
    },
  }),

  {
    chain: getChain("mainnet"),
    contractId,
  }
);
```

## Create Your First Memejob Token

Here’s a simple example of how you can create a new MemeJob token by calling the client’s `createToken` method with the required parameters.

```typescript
const receipt = await client.createToken({
  name: "My awesome token",
  symbol: "MAT",
  memo: "ipfs://1q2w...3e4r",
});

console.log("Transaction receipt:", receipt);
```
