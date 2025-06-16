/**
 * Initialization options for the Pinata IPFS service.
 */
export type PinataInitOptions = {
  /**
   * The base API URL for Pinata.
   */
  apiUrl: string;

  /**
   * The gateway URL for Pinata.
   */
  gatewayUrl: string;

  /**
   * JWT token for authentication with Pinata.
   */
  jwt: string;
};

/**
 * Options for adding content to IPFS via Pinata.
 */
export type PinataAddOptions = {
  /**
   * Metadata associated with the pin.
   */
  pinataMetadata?: {
    /**
     * Optional name for the pinned content.
     */
    name?: string;

    /**
     * Optional key-value pairs as metadata.
     */
    keyvalues?: Record<string, string>;

    /**
     * Additional arbitrary metadata fields.
     */
    [key: string]: unknown;
  };

  /**
   * Options affecting pinning behavior.
   */
  pinataOptions?: {
    /**
     * CID version to use.
     */
    cidVersion?: number;

    /**
     * Group ID for pinning.
     */
    groupId?: string;

    /**
     * Additional arbitrary options.
     */
    [key: string]: unknown;
  };

  /**
   * Additional arbitrary fields for Pinata add options.
   */
  [key: string]: Record<string, unknown> | string | number | undefined;
};

/**
 * Options for pinning content in IPFS via Pinata.
 */
export type PinataPinOptions = {
  /**
   * Metadata associated with the pin.
   */
  pinataMetadata?: PinataAddOptions["pinataMetadata"];

  /**
   * Options affecting pinning behavior.
   */
  pinataOptions?: {
    /**
     * List of host nodes to pin to.
     */
    hostNodes?: string[];

    /**
     * Group ID for pinning.
     */
    groupId?: string;

    /**
     * Additional arbitrary options.
     */
    [key: string]: unknown;
  };

  /**
   * Additional arbitrary options for pinning.
   */
  [key: string]: unknown;
};
