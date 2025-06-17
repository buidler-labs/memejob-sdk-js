# IPFS Services

The SDK provides built-in support for two `IPFS` services through a unified interface. This allows you to choose your preferred `IPFS` provider while maintaining consistent functionality across the SDK.

## Service Interface

All `IPFS` services implement the `IPFSServiceBase` interface:

```typescript
interface IPFSServiceBase {
  /** Upload data to IPFS */
  add(data: Blob | string): Promise<string>;
  /** Get data from IPFS */
  get(cid: string): Promise<Blob>;
  /** Get IPFS gateway URL */
  getGatewayUrl(): string;
}
```

## Built-in Services

### 1. Pinata Service

```typescript
import { PinataService } from "memejob-sdk-js/ipfs";

const pinataService = new PinataService({
  gatewayUrl: "https://your-pinata-gateway.com",
  jwt: "your-pinata-jwt",
});
```

#### Configuration

| Parameter | Type | Description |
|-----------|------|-------------|
| `gatewayUrl` | `string` | Your Pinata gateway URL |
| `jwt` | `string` | Your Pinata JWT token |

### 2. Infura Service

```typescript
import { InfuraService } from "memejob-sdk-js/ipfs";

const infuraService = new InfuraService({
  gatewayUrl: "https://your-infura-gateway.com",
  projectId: "<your-project-id>",
  projectSecret: "y<our-project-secret>",
});
```

#### Configuration

| Parameter | Type | Description |
|-----------|------|-------------|
| `gatewayUrl` | `string` | Your Infura gateway URL |
| `projectId` | `string` | Your Infura project ID |
| `projectSecret` | `string` | Your Infura project secret |

## Usage

### Basic Setup

```typescript
import { MJMemoBuilder } from "memejob-sdk-js";
import { PinataService } from "memejob-sdk-js/ipfs";

// Initialize IPFS service
const pinataService = new PinataService({
  gatewayUrl: "https://your-pinata-gateway.com",
  jwt: "your-pinata-jwt",
});

// Create memo builder with the service
const memoBuilder = new MJMemoBuilder(pinataService);
```

### Switching Services

You can easily switch between different `IPFS` services:

```typescript
// Using Pinata
const pinataService = new PinataService({
  gatewayUrl: "https://your-pinata-gateway.com",
  jwt: "your-pinata-jwt",
});

// Using Infura
const infuraService = new InfuraService({
  gatewayUrl: "https://your-infura-gateway.com",
  projectId: "your-project-id",
  projectSecret: "your-project-secret",
});

// Both services can be used interchangeably
const memoBuilder = new MJMemoBuilder(pinataService);
// or
const memoBuilder = new MJMemoBuilder(infuraService);
```

## Related Documentation

- [Memo Builder](./memo-builder.md) - Using IPFS services with the memo builder
- [Token Metadata](./metadata.md) - Understanding token metadata structure 