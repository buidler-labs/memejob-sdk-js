# Token Metadata

The `MJTokenMetadata` interface defines rich, standardized metadata for your token — from logos and descriptions to social links and custom properties. Uploading it to IPFS lets wallets, exchanges, and platforms display a clear, trustworthy profile for your token.

::: warning
If these properties aren’t properly filled in or follow the required structure, it may lead to incorrect or incomplete display on [memejob](https://memejob.fun) or other platforms that support this standard.
:::

```typescript
interface MJTokenMetadata {
  /** Token description text */
  description: string;
  /** Creator account id */
  creator: `0.0.${number}`;
  /** IPFS path to light theme logo image */
  lightLogo: string;
  /** MIME type of light logo image */
  lightLogotype: string;
  /** IPFS path to dark theme logo image */
  darkLogo: string;
  /** MIME type of dark logo image */
  darkLogotype: string;
  /** Additional token properties */
  properties: {
    /** Optional twitter link */
    twitter?: string;
    /** Optional discord link */
    discord?: string;
    /** Optional telegram link */
    telegram?: string;
    /** Optional website link */
    website?: string;
    /** Optional calaxy worlds link */
    calaxy?: string;
    /** Optional any key-value pairs */
  } & Record<string, string>;
}
```
