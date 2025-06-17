# MJMemoBuilder

This class provides a streamlined way to create and upload token metadata to `IPFS`. It handles the complex process of image upload and metadata generation, ensuring your token information is properly formatted and stored.

## Overview

The builder takes care of:

- Upload to `IPFS`
- Metadata structure validation
- Automatic property formatting
- `IPFS URI` generation

## Implementation

```typescript
interface MJUploadableTokenDetails = {
  /** Token description text */
  description: string;
  /** Creator account id */
  creator: `0.0.${number}`;
  /** Logo image file as Blob */
  image: Blob;
  /** Additional token properties */
  properties: properties: {
    /** Optional `twitter` link */
    twitter?: string;
    /** Optional `discord` link */
    discord?: string;
    /** Optional `telegram` link */
    telegram?: string;
    /** Optional `website` link */
    website?: string;
    /** Optional `calaxy` worlds link */
    calaxy?: string;
    /** Optional any key-value pairs */
  } & Record<string, string>;;
};
```

```typescript
class MJMemoBuilder {
  #service: IPFSServiceBase;

  constructor(service: IPFSServiceBase) {
    this.#service = service;
  }

  async upload(details: MJUploadableTokenDetails): Promise<string>
```

## Usage

### Basic Setup

```typescript
import { MJMemoBuilder } from "memejob-sdk-js";
import { PinataService } from "memejob-sdk-js/ipfs";

// Initialize with your preferred IPFS service
const pinataService = new PinataService({
  gatewayUrl: "https://your-ipfs-gateway.com",
  jwt: "your-pinata-jwt",
});

const memoBuilder = new MJMemoBuilder(pinataService);
```

### Creating Token Metadata

```typescript
// Prepare your token image as a Blob
const imageBlob = await readImageAsBlob("./path/to/token_logo.png");

// Upload metadata
const memo = await memoBuilder.upload({
  description: "My awesome token description",
  creator: "0.0.123456",
  image: imageBlob,
  properties: {
    twitter: "https://x.com/<your-handle>",
    website: "https://<hostname>.domain",
  },
});

// Use the memo in token creation
console.log("Token memo:", memo); // ipfs://Qm...
```

## Best Practices

1. **Image Preparation**

   - Use common formats (`PNG`, `JPG`)
   - Optimize image size before upload
   - Ensure good image quality

2. **Metadata Quality**
   - Write clear, concise descriptions
   - Include all relevant social links
   - Use proper Hedera account ID format for `creator`
