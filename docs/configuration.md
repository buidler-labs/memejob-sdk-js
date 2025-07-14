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
import { getChain } from "@buidlerlabs/memejob-sdk-js";

// Get mainnet configuration
const mainnetChain = getChain("mainnet");

// Get testnet configuration
const testnetChain = getChain("testnet");
```

By default, a chain’s configuration uses [`hashio`](https://www.hashgraph.com/hashio/) as its JSON-RPC relay. However, you can customize this by specifying a custom `rpcURL` when using the `getChain` utility function.

```typescript
const testnet = getChain("mainnet", {
  rpcUrl: "https://mainnet.hedera.api.hgraph.dev/v1/<API-KEY>/api/v1",
});
```

You can find additional `JSON-RPC` relays hosted by members of the community by visiting the following [page](https://docs.hedera.com/hedera/core-concepts/smart-contracts/json-rpc-relay#community-hosted-json-rpc-relays).

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

## Operational Mode Configuration

::: warning
The `operationalMode` config is supported only by the `NativeAdapter`.
:::

The `operationalMode` configuration allows developers to choose between two modes:

- Execute the transaction directly when a `hederaClient` or an [`operator`](http://localhost:5173/memejob-sdk-js/configuration.html#native-using-hashgraph-sdk) is provided.
- Build the transaction and retrieve its byte representation, which can then be sent to a wallet for signing and execution.

#### Configurable modes:

- `returnResult` _(default)_ - Returns the transaction result based on the actual adapter.
- `returnBytes` - Returns the transaction bytes array.

```typescript
const client = new MJClient(
  createAdapter(NativeAdapter, {
    operator: {
      accountId: AccountId.fromString("0.0.123456"),
      privateKey: PrivateKey.fromStringED25519("<private-key>"),
    },
    operationalMode: "returnBytes",
  }),
  {
    chain: getChain("mainnet"),
    contractId
  }
);
```

::: tip
**Security**: Never commit private keys or api keys to version control
:::
