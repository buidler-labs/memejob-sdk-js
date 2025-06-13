function camelToDash(str: string): string {
  return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}

export function toQueryParams(obj: Record<string, any>): string {
  return Object.entries(obj)
    .map(([key, value]) =>
      Array.isArray(value)
        ? value
            .map(
              (v) =>
                `${encodeURIComponent(camelToDash(key))}=${encodeURIComponent(v)}`
            )
            .join("&")
        : `${encodeURIComponent(camelToDash(key))}=${encodeURIComponent(value)}`
    )
    .join("&");
}
