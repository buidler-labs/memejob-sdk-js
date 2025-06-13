import { wait } from "./wait";

export type WithRetryParameters = {
  delay?:
    | ((config: { count: number; error: Error }) => number)
    | number
    | undefined;
  retryCount?: number | undefined;
  shouldRetry?:
    | (({
        count,
        error,
      }: {
        count: number;
        error: Error;
      }) => Promise<boolean> | boolean)
    | undefined;
};

export function withRetry<data>(
  fn: () => Promise<data>,
  {
    delay: delay_ = 100,
    retryCount = 2,
    shouldRetry = () => true,
  }: WithRetryParameters = {}
) {
  return new Promise<data>((resolve, reject) => {
    const attemptRetry = async ({ count = 0 } = {}) => {
      const retry = async ({ error }: { error: Error }) => {
        const delay =
          typeof delay_ === "function" ? delay_({ count, error }) : delay_;
        if (delay) await wait(delay);
        attemptRetry({ count: count + 1 });
      };

      try {
        const data = await fn();
        resolve(data);
      } catch (err) {
        if (
          count < retryCount &&
          (await shouldRetry({ count, error: err as Error }))
        )
          return retry({ error: err as Error });
        reject(err);
      }
    };
    attemptRetry();
  });
}
