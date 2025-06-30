# Token Sell

This guide explains how to sell tokens using the memejob SDK.

## API Reference

### `sell`

Sells tokens to the memejob protocol.

```typescript
async sell(params: SellParameters): Promise<TransactionReceipt>
```

#### Arguments

```typescript
interface SellParameters {
  /** Amount of tokens to sell (in smallest unit) */
  amount: bigint;
  /** Whether to execute the sell instantly */
  instant?: boolean;
  /** Optional referrer address for rewards */
  referrer?: string;
}
```

## Usage

```typescript
import { ContractId } from "@hashgraph/sdk";
import { privateKeyToAccount } from "viem/accounts";
import {
  CONTRACT_DEPLOYMENTS,
  createAdapter,
  EvmAdapter,
  getChain,
  MJClient,
} from "@buidlerlabs/memejob-sdk-js";

const contractId = ContractId.fromEvmAddress(
  0,
  0,
  CONTRACT_DEPLOYMENTS.mainnet.evmAddress
);

// Initialize client
const client = new MJClient(
  createAdapter(EvmAdapter, {
    account: privateKeyToAccount("0x123..."),
  }),
  {
    chain: getChain("mainnet"),
    contractId,
  }
);

// Get token instance
const token = await client.getToken("0.0.5622410");

// Sell 1_000_000 tokens with instant execution
const receipt = await token.sell({
  amount: 100000000000000n,
  instant: true,
});
```

## Best Practices

1. **Amount Precision**: Always use `bigint` for token amounts to avoid precision issues
2. **Instant Sells**: Use `instant: true` for immediate sell execution
3. **Balance Check**: Verify sufficient token balance before selling
4. **Gas Estimation**: Consider gas costs when selling tokens

## Error Handling

```typescript
try {
  const token = await client.getToken("0.0.5622410");

  const receipt = await token.sell({
    amount: 1000000000n,
    instant: true,
  });
} catch (error) {
  console.error("Sell operation failed:", error.message);
}
```
