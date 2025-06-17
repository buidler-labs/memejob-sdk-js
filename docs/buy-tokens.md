# Token Buy

This guide explains how to buy tokens using the memejob SDK.

## API Reference

### `buy`

Buys tokens from the memejob protocol.

```typescript
async buy(params: BuyParameters): Promise<TransactionReceipt>
```

#### Arguments

```typescript
interface BuyParameters {
  /** Amount of tokens to buy (in smallest unit) */
  amount: bigint;
  /** Optional referrer address for rewards */
  referrer?: string;
}
```

## Usage

```typescript
import { ContractId } from "@hashgraph/sdk";
import { privateKeyToAccount } from "viem/accounts";
import { MJClient } from "@buidlerlabs/memejob-sdk-js";
import { createAdapter, EvmAdapter } from "@buidlerlabs/memejob-sdk-js/adapters";
import { getChain } from "@buidlerlabs/memejob-sdk-js/chains";

// Initialize client
const client = new MJClient(
  createAdapter(EvmAdapter, {
    account: privateKeyToAccount("0x123..."),
  }),
  {
    chain: getChain("testnet"),
    contractId: ContractId.fromEvmAddress(0, 0, "0x123..."),
  }
);

// Get token instance
const token = await client.getToken("0.0.5622410");

// Buy 1_000_000 tokens with referrer
const receipt = await token.buy({
  amount: 100000000000000n,
  referrer: "0.0.789012",
});
```

## Best Practices

1. **Amount Precision**: Always use `bigint` for token amounts to avoid precision issues
2. **Referrers**: Include referrer addresses to enable reward distribution
3. **Error Handling**: Always implement proper error handling for transactions
4. **Balance Check**: Verify sufficient HBAR balance before buying

## Error Handling

```typescript
try {
  const token = await client.getToken("0.0.5622410");

  const receipt = await token.buy({
    amount: 100000000000000n,
  });
} catch (error) {
  console.error("Buy operation failed:", error.message);
}
```