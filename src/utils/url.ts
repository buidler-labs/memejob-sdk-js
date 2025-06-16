/**
 * Parses the query parameters from a URL string into a key-value record.
 * @param url - The URL containing query parameters
 * @returns An object with query parameter keys and their decoded values (numbers parsed when possible)
 */
export const parseQueryParams = (url: string): Record<string, unknown> => {
  const queryStart = url.indexOf("?");
  if (queryStart === -1) {
    return {};
  }

  return url
    .substring(queryStart + 1)
    .split("&")
    .reduce(
      (acc, param) => {
        const [key, value] = param.split("=").map(decodeURIComponent);
        if (key) acc[key] = Number(value) || value || "";
        return acc;
      },
      {} as Record<string, unknown>
    );
};
