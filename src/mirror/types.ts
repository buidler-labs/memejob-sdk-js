import {
  Client,
  FetchResponse,
  InitParam,
  MaybeOptionalInit,
} from "openapi-fetch";
import { type paths } from "./openapi/schema";
import { MediaType, PathsWithMethod } from "openapi-typescript-helpers";

export type MirrorPaths = paths;

export type MirrorClient = Client<MirrorPaths, `${string}/${string}`>;

export type MirrorPath = PathsWithMethod<MirrorPaths, "get">;

export type MirrorGetOptions<P extends MirrorPath> = InitParam<
  MaybeOptionalInit<MirrorPaths[P], "get">
>[0];

export type MirrorDataResponse<
  P extends MirrorPath,
  O extends MirrorGetOptions<P>,
> = FetchResponse<MirrorPaths[P]["get"], O, MediaType>["data"];
