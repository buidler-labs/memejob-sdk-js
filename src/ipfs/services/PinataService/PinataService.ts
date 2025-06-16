import axios from "axios";
import { CID } from "multiformats/cid";
import { IPFSServiceBase } from "../IPFSServiceBase";
import type {
  PinataAddOptions,
  PinataInitOptions,
  PinataPinOptions,
} from "./types";

export type ServiceConfig = {
  apiUrl: string;
  gatewayUrl: string;
  headers: Record<string, string>;
};

export const DEFAULT_INIT_OPTIONS: Omit<PinataInitOptions, "jwt"> = {
  apiUrl: "https://api.pinata.cloud",
  gatewayUrl: "https://gateway.pinata.cloud",
};

export class PinataService extends IPFSServiceBase {
  protected _config!: ServiceConfig;
  private _initOptions: PinataInitOptions;

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

  async init() {
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

  async add(value: Blob, options?: PinataAddOptions): Promise<CID> {
    const file = new File([value], options?.pinataMetadata?.name ?? "file");
    const form = new FormData();
    form.append("file", file);

    if (options) {
      Object.entries(options).map(([key, value]) => {
        form.append(key, JSON.stringify(value));
      });
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

    return CID.parse(response.data.IpfsHash);
  }

  async get(cid: CID): Promise<string> {
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

  async pin(cid: CID, options?: PinataPinOptions): Promise<CID> {
    const payload: { [key: string]: string } = {
      hashToPin: cid.toString(),
    };

    if (options) {
      Object.entries(options).map(([key, value]) => {
        payload[key] = JSON.stringify(value);
      });
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

    return CID.parse(response.data.ipfsHash);
  }

  async unpin(cid: CID): Promise<string> {
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
