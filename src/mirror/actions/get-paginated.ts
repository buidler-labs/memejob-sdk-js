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

export const getPaginated = async <
  C extends MirrorClient,
  P extends MirrorPath,
  O extends MirrorGetOptions<P>,
  D extends MirrorDataResponse<P, O>,
  R = D[],
>(parameters: {
  client: C;
  path: P;
  options?: O;
  transform?: (page: D) => R;
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
      params: {
        ...fetchOptions?.params,
        query: parseQueryParams(data.links.next),
      },
    } as O;
  }

  return results;
};
