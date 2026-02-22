// src/lib/search-params.ts
export type AppSearchParams = Record<string, string | string[] | undefined>;
export type AppSearchParamsPromise = Promise<AppSearchParams>;

export function toQueryString(searchParams?: AppSearchParams): string {
  if (!searchParams) return "";

  const usp = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    if (typeof value === "string") {
      usp.set(key, value);
      continue;
    }
    if (Array.isArray(value)) {
      for (const v of value) usp.append(key, v);
    }
  }

  const qs = usp.toString();
  return qs ? `?${qs}` : "";
}