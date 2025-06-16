import {
  type MirrorClient,
  type MirrorDataResponse,
  type MirrorGetOptions,
  MirrorNodeError,
  type MirrorPath,
} from "..";
import {
  type WithRetryParameters,
  parseQueryParams,
  withRetry,
} from "../../utils";

/**
 * Performs a paginated GET request against a mirror node API.
 * Initializes with provided options and requests subsequent pages until `next` is undefined.
 * Transforms each page if a transform is provided.
 * @returns An array of all retrieved (and possibly transformed) pages.
 * @throws MirrorNodeError if any page fails to fetch.
 */
export const getPaginated = async <
  C extends MirrorClient,
  P extends MirrorPath,
  O extends MirrorGetOptions<P>,
  D extends MirrorDataResponse<P, O>,
  R = D[],
>(parameters: {
  /** Mirror API client */
  client: C;
  /** API path to paginate */
  path: P;
  /** Query options for initial page */
  options?: O;
  /** Transformation function applied to each page */
  transform?: (page: D) => R;
  /** Retry configuration for failed requests */
  retryOptions?: WithRetryParameters;
}): Promise<R[]> => {
  const { client, path, transform, options, retryOptions } = parameters;
  let fetchOptions: O | undefined = options;

  const results: R[] = [];

  while (true) {
    const { data, error } = await withRetry(() => {
      return client.GET(path, fetchOptions as any);
    }, retryOptions);

    if (error) throw new MirrorNodeError(error);

    results.push(typeof transform === "function" ? transform(data) : data);

    if (!data.links?.next) break;

    fetchOptions = {
      ...fetchOptions,
      params: {
        ...fetchOptions?.params,
        query: parseQueryParams(data.links.next),
      },
    } as O;
  }

  return results;
};
