/**
 * Initialization options for the Infura IPFS service.
 */
export type InfuraInitOptions = {
  /**
   * The host of the Infura IPFS gateway.
   * @default "ipfs.infura.io"
   */
  host?: string;

  /**
   * The port number of the Infura IPFS gateway.
   * @default 5001
   */
  port?: number;

  /**
   * Protocol to use for connecting to Infura.
   * @default "https"
   */
  protocol?: "https" | "http";

  /**
   * The Infura project key for authentication.
   */
  projectKey: string;

  /**
   * The Infura project secret for authentication.
   */
  projectSecret: string;
};

/**
 * Options to configure the behavior when adding content to IPFS via Infura.
 */
export type InfuraAddOptions = {
  quiet?: boolean;
  quieter?: boolean;
  silent?: boolean;
  progress?: boolean;
  trickle?: boolean;
  onlyHash?: boolean;
  wrapWithDirectory?: boolean;
  pin?: boolean;

  /**
   * Experimental feature to store raw leaves.
   */
  rawLeaves?: boolean;

  /**
   * Experimental option to avoid copying data.
   */
  nocopy?: boolean;

  /**
   * Experimental file system cache usage.
   */
  fscache?: boolean;

  /**
   * Experimental CID version.
   */
  cidVersion?: number;

  /**
   * Experimental hash algorithm.
   */
  hash?: string;
};

/**
 * Options for pinning content in IPFS via Infura.
 */
export type InfuraPinOptions = {
  /**
   * Whether to pin recursively.
   */
  recursive: boolean;

  /**
   * Whether to show progress.
   */
  progress: boolean;
};
