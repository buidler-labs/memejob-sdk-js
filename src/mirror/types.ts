import type {
  Client,
  FetchResponse,
  InitParam,
  MaybeOptionalInit,
} from "openapi-fetch";
import type { MediaType, PathsWithMethod } from "openapi-typescript-helpers";
import type { paths } from "./openapi/schema";

/**
 * Type representing all available mirror node API paths.
 */
export type MirrorPaths = paths;

/**
 * Type representing a configured mirror node API client.
 */
export type MirrorClient = Client<MirrorPaths, `${string}/${string}`>;

/**
 * Type representing a GET path supported by mirror node API.
 */
export type MirrorPath = PathsWithMethod<MirrorPaths, "get">;

/**
 * Type of options required to execute a GET request against a mirror node path.
 */
export type MirrorGetOptions<P extends MirrorPath> = InitParam<
  MaybeOptionalInit<MirrorPaths[P], "get">
>[0];

/**
 * Type of the data returned by a GET request against mirror node API.
 */
export type MirrorDataResponse<
  P extends MirrorPath,
  O extends MirrorGetOptions<P>,
> = FetchResponse<MirrorPaths[P]["get"], O, MediaType>["data"];
