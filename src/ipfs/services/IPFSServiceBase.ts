import { CID } from "multiformats";

export abstract class IPFSServiceBase {
  abstract init(): Promise<any>;
  abstract add(value: Blob, options?: Record<string, unknown>): Promise<CID>;
  abstract get(cid: CID): Promise<any>;
  abstract pin(
    cid: CID,
    options?: Record<string, unknown>
  ): Promise<CID | CID[]>;
  abstract unpin(cid: CID): Promise<string>;
}
