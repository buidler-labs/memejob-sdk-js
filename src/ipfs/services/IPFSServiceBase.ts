/**
 * An abstract base class for IPFS service adapters.
 * All IPFS service adapters should implement these methods.
 */
export abstract class IPFSServiceBase {
  /**
   * Initializes the IPFS service. Should be called before any operations.
   * @returns The initialized service instance.
   */
  abstract init(): Promise<any>;

  /**
   * Adds a blob to IPFS.
   * @param value The blob to add.
   * @param options Optional configuration.
   * @returns The CID of the newly added content.
   */
  abstract add(value: Blob, options?: Record<string, unknown>): Promise<string>;

  /**
   * Retrieves a blob from IPFS by its CID.
   * @param cid The CID of the content to retrieve.
   * @returns The retrieved content.
   */
  abstract get(cid: string): Promise<any>;

  /**
   * Pins a blob in IPFS.
   * @param cid The CID of the content to pin.
   * @param options Optional configuration.
   * @returns The pinned CID or an array of CIDs.
   */
  abstract pin(
    cid: string,
    options?: Record<string, unknown>
  ): Promise<string | string[]>;

  /**
   * Unpins a blob from IPFS.
   * @param cid The CID of the content to unpin.
   * @returns The unpinned CID as a string.
   */
  abstract unpin(cid: string): Promise<string>;
}
