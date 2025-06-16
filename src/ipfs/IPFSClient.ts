import { CID } from "multiformats";
import type { IPFSServiceBase } from "./services/IPFSServiceBase";

/**
 * IPFS Client wrapper for interacting with a service that implements IPFS operations.
 * @template TService - The service implementation extending IPFSServiceBase.
 */
export class IpfsClient<TService extends IPFSServiceBase> {
  protected _service!: IPFSServiceBase;

  private constructor(service: TService) {
    this._service = service;
  }

  /**
   * Initializes and returns a new IpfsClient instance.
   * Initializes the service first.
   * @param service The IPFS service to use.
   * @returns An initialized IpfsClient.
   */
  static async use<TService extends IPFSServiceBase>(
    service: TService
  ): Promise<IpfsClient<TService>> {
    return new IpfsClient<TService>(await service.init());
  }

  private async request(
    method: keyof Omit<IPFSServiceBase, "init">,
    ...params: any
  ) {
    if (!this._service) throw new Error("IPFS service not found.");

    try {
      // @ts-ignore
      return await this._service[method](...params);
    } catch (error: any) {
      if (error.response) {
        throw new Error(
          error.response.data.error?.message ||
            error.response.data.error?.details
        );
      }
      throw new Error(error.message);
    }
  }

  /**
   * Adds a blob, object, or string to IPFS.
   * @param value The content to add. Could be a Blob, a plain object, or a string.
   * @param options Optional parameters supported by the service's `add` method.
   * @returns The CID of the newly added content.
   */
  async add(
    value: Blob | Record<string, unknown> | string,
    options?: Parameters<TService["add"]>[1]
  ): Promise<CID> {
    let blob: Blob;

    if (value instanceof Blob) {
      blob = value;
    } else if (typeof value === "object") {
      blob = new Blob([JSON.stringify(value)], { type: "application/json" });
    } else {
      blob = new Blob([JSON.stringify(value)], { type: "text/plain" });
    }
    return this.request("add", blob, options);
  }

  /**
   * Retrieves a file from IPFS by its CID.
   * @param value The CID of the IPFS object to retrieve.
   * @param options Optional parameters supported by the service's `get` method.
   * @returns The retrieved content as a string.
   */
  async get(
    value: string,
    options?: Parameters<TService["get"]>[1]
  ): Promise<string> {
    return this.request("get", CID.parse(value), options);
  }

  /**
   * Pins a file to IPFS by its CID.
   * @param value The CID of the IPFS object to pin.
   * @param options Optional parameters supported by the service's `pin` method.
   * @returns The pinned CID or an array of CIDs.
   */
  async pin(
    value: string,
    options?: Parameters<TService["pin"]>[1]
  ): Promise<CID | CID[]> {
    return this.request("pin", CID.parse(value), options);
  }

  /**
   * Unpins a file from IPFS by its CID.
   * @param value The CID of the IPFS object to unpin.
   * @param options Optional parameters supported by the service's `unpin` method.
   * @returns The unpinned CID as a string.
   */
  async unpin(
    value: string,
    options?: Parameters<TService["unpin"]>[1]
  ): Promise<string> {
    return this.request("unpin", CID.parse(value), options);
  }
}
