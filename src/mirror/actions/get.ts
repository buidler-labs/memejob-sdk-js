import type {
  MirrorClient,
  MirrorDataResponse,
  MirrorGetOptions,
  MirrorPath,
} from "..";
import { type WithRetryParameters, withRetry } from "../../utils";
import { MirrorNodeError } from "../errors";

/**
 * Type of parameters required for performing a GET request against a mirror node.
 */
export type MirrorNodeGetParameters<C, P, O, D, R> = {
  /** Mirror API client */
  client: C;
  /** API path to fetch from */
  path: P;
  /** Query options to send with the GET request */
  options?: O;
  /** Transformation function to apply on the retrieved data */
  transform?: (mirrorResponse: D) => R;
  /** Retry configuration for failed requests */
  retryOptions?: WithRetryParameters;
};

/**
 * Performs a GET request against a mirror node API.
 * Retries if configured and transforms the result if a transform is provided.
 * @returns The fetched (and possibly transformed) data.
 * @throws MirrorNodeError if the API responds with an error.
 */
export const get = async <
  C extends MirrorClient,
  P extends MirrorPath,
  O extends MirrorGetOptions<P>,
  D extends MirrorDataResponse<P, O>,
  R = D,
>(
  parameters: MirrorNodeGetParameters<C, P, O, D, R>
): Promise<R> => {
  const { client, path, transform, options, retryOptions } = parameters;

  const data = await withRetry(async () => {
    const { data, error } = await client.GET(path, options as any);
    if (error) throw new MirrorNodeError(error);

    return data;
  }, retryOptions);

  return typeof transform === "function" ? transform(data as D) : (data as R);
};
