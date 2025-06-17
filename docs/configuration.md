# Configuration

The memejob SDK can be configured to suit your specific needs. This guide covers all available configuration options.

## Client Configuration

The `MJClient` accepts two main parameters:

1. A network adapter factory function
2. A configuration object

```typescript
interface MJClientConfig {
  /** Memejob contract id */
  contractId: ContractId;
  /** Network chain configuration */
  chain: Chain;
  /** Base URL for `Hedera Mirror Node API` */
  mirrorBaseUrl?: string;
}
```

## Network Adapters

The SDK has two built-in types of network adapters

### Native (using `@hashgraph/sdk`)

```typescript
import { AccountId, ContractId, PrivateKey } from "@hashgraph/sdk";
import { MJClient } from "@buidlerlabs/memejob-sdk-js";
import {
  createAdapter,
  NativeAdapter,
} from "@buidlerlabs/memejob-sdk-js/adapters";
import { getChain } from "@buidlerlabs/memejob-sdk-js/chains";

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

### EVM (using `viem.sh`)

```typescript
import { ContractId } from "@hashgraph/sdk";
import { privateKeyToAccount } from "viem/accounts";
import { MJClient } from "@buidlerlabs/memejob-sdk-js";
import {
  createAdapter,
  EvmAdapter,
} from "@buidlerlabs/memejob-sdk-js/adapters";
import { getChain } from "@buidlerlabs/memejob-sdk-js/chains";

const contractId = ContractId.fromEvmAddress(0, 0, "0x123..456");

const client = new MJClient(
  createAdapter(EvmAdapter, {
    account: privateKeyToAccount("0x123..456"),
  }),
  {
    chain: getChain("mainnet"),
    contractId,
  }
);
```

## Chain Configuration

The SDK uses the `viem` library for chain configuration. You can get the chain configuration using the `getChain` function:

```typescript
import { getChain } from "@buidlerlabs/memejob-sdk-js/chains";

// Get mainnet configuration
const mainnetChain = getChain("mainnet");

// Get testnet configuration
const testnetChain = getChain("testnet");
```

By default, a chain’s configuration uses [`hashio`](https://www.hashgraph.com/hashio/) as its JSON-RPC relay. However, you can customize this by specifying a custom `rpcURL` when using the `getChain` utility function.

```typescript
const testnet = getChain("testnet", {
  rpcUrl: "https://pool.arkhia.io/hedera/testnet/json-rpc/v1",
});
```

## Mirror Node Configuration

Behind the scenes, the SDK relies on a [Mirror Node](https://docs.hedera.com/hedera/sdks-and-apis/rest-api) client configuration to fetch the required information from the network in real time. By default, it uses `https://{mainnet/testnet}.mirrornode.hedera.com/api/v1`, but this can be customized as demonstrated in the example below:

```typescript
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
    mirrorBaseUrl: "https://mainnet.hedera.validationcloud.io/v1/<api-key>",
  }
);
```

::: tip
**Security**: Never commit private keys or api keys to version control
:::
