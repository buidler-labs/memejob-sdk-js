import { IpfsClient } from "./ipfs";
import { IPFSServiceBase } from "./ipfs/services/IPFSServiceBase";

/** Complete token metadata structure stored on `IPFS` */
export type MJTokenMetadata = {
  /** Token description text */
  description: string;
  /** Creator account id */
  creator: `0.0.${number}`;
  /** `IPFS` path to light theme logo image */
  lightLogo: string;
  /** `MIME` type of light logo image */
  lightLogotype: string;
  /** `IPFS` path to dark theme logo image */
  darkLogo: string;
  /** `MIME` type of dark logo image */
  darkLogotype: string;
  /** Additional token properties */
  properties: {
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
  } & Record<string, string>;
};

/** Input data required for uploading token metadata to `IPFS` */
export type MJUploadableTokenDetails = {
  /** Token description text */
  description: MJTokenMetadata["description"];
  /** Creator account id */
  creator: MJTokenMetadata["creator"];
  /** Logo image file as Blob */
  image: Blob;
  /** Additional token properties */
  properties: MJTokenMetadata["properties"];
};

/**
 * Builder for creating IPFS-based token memo URIs.
 * Handles image upload and metadata generation for token memos.
 */
export class MJMemoBuilder {
  #service: IPFSServiceBase;

  /**
   * Creates `MJMemoBuilder` with specified IPFS service (e.g. `PinataService`).
   * @param service - IPFS service implementation for file uploads
   */
  constructor(service: IPFSServiceBase) {
    this.#service = service;
  }

  /**
   * Uploads token details to IPFS and returns memo URI.
   * @param details - Token details including `description`, `creator`, `image`, and `properties`
   * @returns Promise resolving to IPFS URI for use as token memo
   */
  async upload(details: MJUploadableTokenDetails) {
    const { description, creator, image, properties } = details;

    const ipfsClient = await IpfsClient.use(this.#service);
    const imagePath = "ipfs://" + (await ipfsClient.add(image));
    const defaultProperties: Record<string, string> = {
      category: "@memejob-fun/sdk",
    };

    const metadata = {
      description: description.trim(),
      creator: creator.trim(),
      lightLogo: imagePath.trim(),
      lightLogotype: image.type.trim(),
      darkLogo: imagePath.trim(),
      darkLogotype: image.type.trim(),
      properties: Object.entries(properties).reduce((acc, [key, value]) => {
        acc[key] = (value as string).trim();
        return acc;
      }, defaultProperties),
    };

    return `ipfs://${await ipfsClient.add(metadata)}`;
  }
}
