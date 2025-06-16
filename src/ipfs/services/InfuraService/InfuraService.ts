import axios from "axios";
import { CID } from "multiformats/cid";
import { toQueryParams } from "../../utils";
import { IPFSServiceBase } from "../IPFSServiceBase";
import type { InfuraAddOptions, InfuraInitOptions } from "./types";

export type ServiceConfig = {
  baseUrl: string;
  headers: Record<string, string>;
};

/**
 * Default initialization options for InfuraService,
 * excluding mandatory projectKey and projectSecret.
 */
export const DEFAULT_INIT_OPTIONS: Omit<
  InfuraInitOptions,
  "projectKey" | "projectSecret"
> = {
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
};

/**
 * Infura IPFS service implementation.
 * Provides methods to interact with Infura's IPFS API including add, get, pin, and unpin.
 */
export class InfuraService extends IPFSServiceBase {
  protected _config!: ServiceConfig;
  private _initOptions: InfuraInitOptions;

  /**
   * Constructs an InfuraService instance.
   * @param options Partial initialization options combined with required authentication keys.
   */
  constructor(
    options: Partial<InfuraInitOptions> & {
      projectKey: string;
      projectSecret: string;
    }
  ) {
    super();
    this._initOptions = {
      ...DEFAULT_INIT_OPTIONS,
      ...options,
    };
  }

  /**
   * Initializes the service by setting up base URL and authentication headers.
   * @returns The initialized instance of InfuraService.
   */
  async init(): Promise<this> {
    const auth = Buffer.from(
      `${this._initOptions.projectKey}:${this._initOptions.projectSecret}`
    ).toString("base64");

    this._config = {
      baseUrl: `${this._initOptions.protocol}://${this._initOptions.host}:${this._initOptions.port}`,
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "multipart/form-data",
      },
    };
    return this;
  }

  /**
   * Adds content to IPFS via Infura.
   * @param value - The content as a Blob.
   * @param options - Optional parameters controlling add behavior (pinning, hashing, etc.).
   * @returns A Promise resolving to the CID of the added content.
   */
  async add(
    value: Blob,
    options: InfuraAddOptions = {
      pin: true,
    }
  ): Promise<CID> {
    const params = options ? `?${toQueryParams(options)}` : "";
    const form = new FormData();
    form.append("file", value);

    const response = await axios.post(
      `${this._config.baseUrl}/api/v0/add${params}`,
      form,
      {
        headers: {
          ...this._config.headers,
          "Content-Length": value.size,
        },
      }
    );

    return CID.parse(response.data.Hash);
  }

  /**
   * Retrieves the content of the given CID from IPFS.
   * @param cid - The CID of the content to retrieve.
   * @returns A Promise resolving to the content as a string.
   */
  async get(cid: CID): Promise<string> {
    const response = await axios.post(
      `${this._config.baseUrl}/api/v0/cat?arg=${cid.toString()}`,
      null,
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
   * Pins the content identified by the given CID on the IPFS node.
   * @param cid - The CID to pin.
   * @returns A Promise resolving to an array of pinned CIDs.
   */
  async pin(cid: CID): Promise<CID[]> {
    const response = await axios.post(
      `${this._config.baseUrl}/api/v0/pin/add?arg=${cid.toString()}`,
      null,
      {
        headers: {
          ...this._config.headers,
          "Content-Type": "application/json",
        },
      }
    );

    if (Array.isArray(response.data.Pins) && response.data.Pins.length > 0) {
      return response.data.Pins.map((cidStr: string) => CID.parse(cidStr));
    }

    return response.data;
  }

  /**
   * Unpins the content identified by the given CID from the IPFS node.
   * @param cid - The CID to unpin.
   * @returns A Promise resolving to a confirmation string.
   */
  async unpin(cid: CID): Promise<string> {
    const response = await axios.post(
      `${this._config.baseUrl}/api/v0/pin/rm?arg=${cid.toString()}`,
      null,
      {
        headers: {
          ...this._config.headers,
          "Content-Type": "application/json",
        },
      }
    );

    return "OK";
  }
}
