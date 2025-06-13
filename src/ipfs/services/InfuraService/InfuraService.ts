import { IPFSServiceBase } from "../IPFSServiceBase";
import { InfuraAddOptions, InfuraInitOptions } from "./types";
import { CID } from "multiformats/cid";
import axios from "axios";
import { toQueryParams } from "../../utils";

export type ServiceConfig = {
  baseUrl: string;
  headers: Record<string, string>;
};

export const DEFAULT_INIT_OPTIONS: Omit<
  InfuraInitOptions,
  "projectKey" | "projectSecret"
> = {
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
};

export class InfuraService extends IPFSServiceBase {
  protected _config!: ServiceConfig;
  private _initOptions: InfuraInitOptions;

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

  async init() {
    const auth = Buffer.from(
      this._initOptions.projectKey + ":" + this._initOptions.projectSecret
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
      `${this._config.baseUrl}/api/v0/add` + params,
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
      return response.data.Pins.map((cid: string) => CID.parse(cid));
    }

    return response.data;
  }
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
