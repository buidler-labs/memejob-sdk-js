import { wait } from "./wait";

/**
 * Parameters for the `withRetry` function to control retry behavior.
 */
export type WithRetryParameters = {
  /**
   * Delay between retries in milliseconds or a function returning delay based on retry count and error.
   */
  delay?:
    | ((config: { count: number; error: Error }) => number)
    | number
    | undefined;
  /**
   * Maximum number of retry attempts.
   */
  retryCount?: number | undefined;
  /**
   * Function to determine whether to retry based on retry count and error.
   */
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

/**
 * Executes an async function with retry logic based on specified parameters.
 * @param fn - The async function to execute
 * @param WithRetryConfig - Retry configuration parameters
 * @returns Promise resolving to the function's result or rejecting after retries exhausted
 */
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
