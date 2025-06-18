import axios from "axios";
import { IPFSServiceBase } from "../IPFSServiceBase";
import type {
  PinataAddOptions,
  PinataInitOptions,
  PinataPinOptions,
} from "./types";
import { File } from "@web-std/file";

export type ServiceConfig = {
  apiUrl: string;
  gatewayUrl: string;
  headers: Record<string, string>;
};

export const DEFAULT_INIT_OPTIONS: Omit<PinataInitOptions, "jwt"> = {
  apiUrl: "https://api.pinata.cloud",
  gatewayUrl: "https://gateway.pinata.cloud",
};

/**
 * Pinata IPFS service implementation.
 * Provides methods for adding, getting, pinning, and unpinning content via Pinata API.
 */
export class PinataService extends IPFSServiceBase {
  protected _config!: ServiceConfig;
  private _initOptions: PinataInitOptions;

  /**
   * Constructs a PinataService instance.
   * @param options - Partial initialization options combined with the required JWT token.
   */
  constructor(
    options: Partial<PinataInitOptions> & {
      jwt: string;
    }
  ) {
    super();
    this._initOptions = {
      ...DEFAULT_INIT_OPTIONS,
      ...options,
    };
  }

  /**
   * Initializes the service by setting up API and gateway URLs and authorization headers.
   * @returns A Promise resolving to the initialized PinataService instance.
   */
  async init(): Promise<this> {
    this._config = {
      apiUrl: this._initOptions.apiUrl,
      gatewayUrl: this._initOptions.gatewayUrl,
      headers: {
        Authorization: `Bearer ${this._initOptions.jwt}`,
        "Content-Type": "multipart/form-data",
      },
    };
    return this;
  }

  /**
   * Adds a file/blob to IPFS via Pinata.
   * @param value - The Blob data to add.
   * @param options - Optional add options including metadata and pinning options.
   * @returns A Promise resolving to the CID of the added content.
   */
  async add(value: Blob, options?: PinataAddOptions): Promise<string> {
    const file = new File([value], options?.pinataMetadata?.name ?? "file");
    const form = new FormData();
    form.append("file", file);

    if (options) {
      for (const [key, val] of Object.entries(options)) {
        form.append(key, JSON.stringify(val));
      }
    }

    const response = await axios.post(
      `${this._config.apiUrl}/pinning/pinFileToIPFS`,
      form,
      {
        headers: {
          ...this._config.headers,
        },
      }
    );

    return response.data.IpfsHash;
  }

  /**
   * Retrieves the content for the given CID from Pinata's gateway.
   * @param cid - The CID of the content to fetch.
   * @returns A Promise resolving to the content as a string.
   */
  async get(cid: string): Promise<string> {
    const response = await axios.get(
      `${this._config.gatewayUrl}/ipfs/${cid.toString()}`,
      {
        headers: {
          ...this._config.headers,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  }

  /**
   * Pins existing IPFS content on Pinata by its CID.
   * @param cid - The CID of the content to pin.
   * @param options - Optional pinning options including metadata and pinning preferences.
   * @returns A Promise resolving to the CID of the pinned content.
   */
  async pin(cid: string, options?: PinataPinOptions): Promise<string> {
    const payload: Record<string, string> = {
      hashToPin: cid.toString(),
    };

    if (options) {
      for (const [key, val] of Object.entries(options)) {
        payload[key] = JSON.stringify(val);
      }
    }

    const response = await axios.post(
      `${this._config.apiUrl}/pinning/pinByHash`,
      JSON.stringify(payload),
      {
        headers: {
          ...this._config.headers,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.ipfsHash;
  }

  /**
   * Unpins pinned content by CID from Pinata.
   * @param cid - The CID of the content to unpin.
   * @returns A Promise resolving to a confirmation string.
   */
  async unpin(cid: string): Promise<string> {
    const response = await axios.delete(
      `${this._config.apiUrl}/pinning/unpin/${cid.toString()}`,
      {
        headers: {
          ...this._config.headers,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  }
}
