export const parseQueryParams = (url: string): Record<string, unknown> => {
  const queryStart = url.indexOf("?");
  if (queryStart === -1) {
    return {};
  }

  return url
    .substring(queryStart + 1)
    .split("&")
    .reduce((acc, param) => {
      const [key, value] = param.split("=").map(decodeURIComponent);
      if (key) acc[key] = Number(value) || value || "";
      return acc;
    }, {} as Record<string, unknown>);
};
