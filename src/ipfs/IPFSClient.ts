import { CID } from "multiformats";
import { IPFSServiceBase } from "./services/IPFSServiceBase";

export class IpfsClient<TService extends IPFSServiceBase> {
  protected _service!: IPFSServiceBase;

  private constructor(service: TService) {
    this._service = service;
  }

  static async use<TService extends IPFSServiceBase>(service: TService) {
    return new IpfsClient<TService>(await service.init());
  }

  private async request(
    method: keyof Omit<IPFSServiceBase, "init">,
    ...params: any
  ) {
    if (!this._service) throw new Error("IPFS service not found.");

    try {
      const response = await this._service[method](
        //@ts-ignore
        ...params
      );

      return response;
    } catch (error: any) {
      if (error.response) {
        throw new Error(
          error.response.data.error?.message ||
            error.response.data.error?.details
        );
      } else {
        throw new Error(error.message);
      }
    }
  }

  async add(
    value: Blob | Record<string, unknown> | string,
    options?: Parameters<TService["add"]>[1]
  ): Promise<CID> {
    let blob: Blob;

    if (value instanceof Blob) {
      blob = value as Blob;
    } else if (typeof value === "object") {
      blob = new Blob([JSON.stringify(value)], {
        type: "application/json",
      });
    } else {
      blob = new Blob([JSON.stringify(value)], {
        type: "text/plain",
      });
    }

    return this.request("add", blob, options);
  }

  async get(
    value: string,
    options?: Parameters<TService["get"]>[1]
  ): Promise<string> {
    return this.request("get", CID.parse(value), options);
  }

  async pin(
    value: string,
    options?: Parameters<TService["pin"]>[1]
  ): Promise<CID | CID[]> {
    return this.request("pin", CID.parse(value), options);
  }

  async unpin(
    value: string,
    options?: Parameters<TService["unpin"]>[1]
  ): Promise<string> {
    return this.request("unpin", CID.parse(value), options);
  }
}
