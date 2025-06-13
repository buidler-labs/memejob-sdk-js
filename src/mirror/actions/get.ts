import { withRetry, type WithRetryParameters } from "../../utils";
import { MirrorNodeError } from "../errors";
import {
  MirrorClient,
  MirrorDataResponse,
  MirrorGetOptions,
  MirrorPath,
} from "..";

export type MirrorNodeGetParameters<C, P, O, D, R> = {
  client: C;
  path: P;
  options?: O;
  transform?: (mirrorResponse: D) => R;
  retryOptions?: WithRetryParameters;
};

export const get = async <
  C extends MirrorClient,
  P extends MirrorPath,
  O extends MirrorGetOptions<P>,
  D extends MirrorDataResponse<P, O>,
  R = D
>(
  parameters: MirrorNodeGetParameters<C, P, O, D, R>
): Promise<R> => {
  const { client, path, transform, options, retryOptions } = parameters;

  const { data, error } = await withRetry(() => {
    return client.GET(path, options as any);
  }, retryOptions);

  if (error) throw new MirrorNodeError(error);

  return typeof transform === "function" ? transform(data as D) : (data as R);
};
