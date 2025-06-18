# Token Creation

This guide explains how to create new tokens using the SDK.

## API Reference

### `createToken`

Creates a new token on the memejob platform.

```typescript
async createToken(
  params: CreateTokenParameters,
  options?: CreateOptions
): Promise<TransactionReceipt>
```

#### Arguments

<br/>

##### `params: CreateTokenParameters`

```typescript
interface CreateTokenParameters {
  /** Token name */
  name: string;
  /** Token symbol */
  symbol: string;
  /** Token metadata URI (IPFS) */
  memo: string;
}
```

##### `options?: CreateOptions`

```typescript
interface CreateOptions {
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
  createAdapter,
  getChain,
  MJClient,
  NativeAdapter,
} from "@buidlerlabs/memejob-sdk-js";

// Initialize the client
const client = new MJClient(
  createAdapter(NativeAdapter, {
    operator: {
      accountId: AccountId.fromString("0.0.123456"),
      privateKey: PrivateKey.fromStringECDSA("<private-key>"),
    },
  }),
  {
    chain: getChain("testnet"),
    contractId: ContractId.fromString("0.0.123456"),
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
