# Getting Started

This guide will help you get up and running with the [memejob](https://memejob.fun) SDK quickly.

## Prerequisites

Before you begin, make sure you have:

- [Node.js](https://nodejs.org/) (v18 or higher)
- A package manager ([npm](https://npmjs.com), [pnpm](https://pnpm.io/), [yarn](https://yarnpkg.com/) or [bun](https://bun.sh/))
- A [Hedera](https://hedera.com/) account with sufficient HBAR for transactions

## Installation

::: code-group

```sh [npm]
$ npm i memejob-sdk-js @hashgraph/sdk viem
```

```sh [pnpm]
$ pnpm add memejob-sdk-js @hashgraph/sdk viem
```

```sh [yarn]
$ yarn add memejob-sdk-js @hashgraph/sdk viem
```

```sh [bun]
$ bun add memejob-sdk-js @hashgraph/sdk viem
```

:::

## Usage

Setup a new memejob client

::: code-group

```typescript [@hashgraph/sdk]
import { AccountId, ContractId, PrivateKey } from "@hashgraph/sdk";
import { MJClient } from "memejob-sdk-js";
import { createAdapter, NativeAdapter } from "memejob-sdk-js/adapters";
import { getChain } from "memejob-sdk-js/chains";

const contractId = ContractId.fromString("0.0.123456"); // [!code focus]

const client = new MJClient( // [!code focus]
  // [!code focus]
  createAdapter(NativeAdapter, {
    // [!code focus]
    operator: {
      // [!code focus]
      accountId: AccountId.fromString("0.0.123456"), // [!code focus]
      privateKey: PrivateKey.fromStringED25519("<private-key>"), // [!code focus]
    }, // [!code focus]
  }), // [!code focus]
  // [!code focus]
  {
    chain: getChain("mainnet"), // [!code focus]
    contractId, // [!code focus]
  } // [!code focus]
); // [!code focus]
```

```typescript [viem]
import { ContractId } from "@hashgraph/sdk";
import { privateKeyToAccount } from "viem/accounts";
import { MJClient } from "memejob-sdk-js";
import { createAdapter, EvmAdapter } from "memejob-sdk-js/adapters";
import { getChain } from "memejob-sdk-js/chains";

const contractId = ContractId.fromEvmAddress(0, 0, "0x123..456"); // [!code focus]

const client = new MJClient( // [!code focus]
  // [!code focus]
  createAdapter(EvmAdapter, {
    account: privateKeyToAccount("0x123..456"), // [!code focus]
  }), // [!code focus]
  // [!code focus]
  {
    chain: getChain("mainnet"), // [!code focus]
    contractId, // [!code focus]
  } // [!code focus]
); // [!code focus]
```

:::

## Create Your First Token

Here’s a simple example of how you can create a new MemeJob token by calling the client’s `createToken` method with the required parameters.

```typescript
const receipt = await client.createToken({
  name: "My awesome token",
  symbol: "MAT",
  memo: "ipfs://1q2w...3e4r",
});

console.log("Transaction receipt:", receipt);
```

## Next Steps

- Learn about [Configuration](./configuration.md) options
