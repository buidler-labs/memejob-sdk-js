# Mirror Node Client

The SDK includes a built-in client for interacting with Hedera's [Mirror Node API](https://docs.hedera.com/hedera/sdks-and-apis/rest-api) . This client provides a convenient way to query blockchain data and interact with smart contracts.

## Overview

The Mirror Node client is organized two key components:

- **Configuration**: Client setup and configuration options
- **Actions**: Predefined operations for common tasks

## Configuration

```typescript
import { createMirrorConfig } from "@buidlerlabs/memejob-sdk-js/mirror";
import { getChain } from "@buidlerlabs/memejob-sdk-js/chains";

const mirrorClient = createMirrorConfig({
  chain: getChain("testnet"),
});
```

### Configuration Options

| Parameter | Type     | Description                    | Default                                          |
| --------- | -------- | ------------------------------ | ------------------------------------------------ |
| `baseUrl` | `string` | Mirror Node API base URL       | `https://${chain2network}.mirrornode.hedera.com` |
| `chain`   | `string` | (Optional) chain configuration | testnet                                          |