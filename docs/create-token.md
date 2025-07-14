# Token Creation

This guide explains how to create new tokens using the SDK.

## API Reference

### `createToken`

Creates a new token on the memejob platform.

```typescript
async createToken(
  params: MJCreateTokenParameters,
  options?: MJCreateOptions
): Promise<MJToken>
```

#### Arguments

<br/>

##### `params: MJCreateTokenParameters`

```typescript
interface MJCreateTokenParameters {
  /** Token name */
  name: string;
  /** Token symbol */
  symbol: string;
  /** Token metadata URI (IPFS) */
  memo: string;
}
```

##### `options?: MJCreateOptions`

```typescript
interface MJCreateOptions {
  /** Referrer address for rewards */
  referrer?: string;
  /** Token amount to buy on creation*/
  amount?: bigint;
  /** Whether to distribute rewards */
  distributeRewards?: boolean;
}
```

## Usage

```typescript
import { AccountId, ContractId, PrivateKey } from "@hashgraph/sdk";
import {
  CONTRACT_DEPLOYMENTS,
  createAdapter,
  getChain,
  MJClient,
  NativeAdapter,
} from "@buidlerlabs/memejob-sdk-js";

const contractId = ContractId.fromString(
  CONTRACT_DEPLOYMENTS.mainnet.contractId
);

// Initialize the client
const client = new MJClient(
  createAdapter(NativeAdapter, {
    operator: {
      accountId: AccountId.fromString("0.0.123456"),
      privateKey: PrivateKey.fromStringECDSA("<private-key>"),
    },
  }),
  {
    chain: getChain("mainnet"),
    contractId,
  }
);

const tokenInfo = {
  name: "My Token",
  symbol: "MTK",
  memo: "ipfs://Qm...",
};

// Create a token and buy 1000 on creation
const token = await client.createToken(tokenInfo, {
  amount: 100000000000n,
  distributeRewards: true,
  referrer: "0x000...000",
});
```

When [`operationalMode`](http://localhost:5173/memejob-sdk-js/configuration.html#operational-mode-configuration) is set to `returnBytes`, the final result will be the transaction’s byte array

```typescript

const client = new MJClient(
  createAdapter(NativeAdapter, {
    operator: {
      accountId: AccountId.fromString("0.0.123456"),
      privateKey: PrivateKey.fromStringECDSA("<private-key>"),
    },
    operationalMode: "returnBytes"
  }),
  {
    chain: getChain("mainnet"),
    contractId
  }
);

...

const transactionBytes = await client.createToken(tokenInfo, {
  amount: 100000000000n,
  distributeRewards: true,
  referrer: "0x000...000",
}); // <Buffer 0a 85 01 1a ... and more bytes>
```

::: warning
The [`operationalMode`](http://localhost:5173/memejob-sdk-js/configuration.html#operational-mode-configuration) config is supported only by the `NativeAdapter`.
:::

## Best Practices

1. **Metadata**: Always provide meaningful [metadata](./metadata.md) for your token
2. **IPFS**: Use a reliable IPFS service for metadata storage (e.g. [Pinata Cloud](https://pinata.cloud/))
3. **Rewards**: Consider whether to enable reward distribution

## Error Handling

```typescript
try {
  const token = await client.createToken({
    name: "My Token",
    symbol: "MTK",
    memo: "ipfs://Qm...",
  });
} catch (error) {
  console.error("Token creation failed:", error.message);
}
```
