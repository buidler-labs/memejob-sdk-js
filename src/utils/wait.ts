/**
 * Returns a promise that resolves after a specified delay.
 * @param delay - Delay duration in milliseconds
 * @returns Promise that resolves after the given delay
 */
export const wait = (delay: number) => {
  return new Promise((res) => setTimeout(res, delay));
};
