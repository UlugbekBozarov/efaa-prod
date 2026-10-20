// src/core/http/api.ts
const API_URL = import.meta.env.VITE_API_URL;
const DEVICE_ID = import.meta.env.VITE_HEADER_DEVICE_ID;
const DEVICE_VISITOR = import.meta.env.VITE_HEADER_DEVICE_VISITOR;

import { getVisitorId } from "../../core/fingerprint";

export type IApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiOptions extends Omit<RequestInit, "method" | "body"> {
  method?: IApiMethod;
  body?: any;
  responseType?: "blob" | "text" | "arrayBuffer" | "void";
  query?: Record<string, string | number | boolean | undefined>;
}

// Helper: object → query string
function buildQueryString(query?: Record<string, any>) {
  if (!query) return "";
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined) params.append(key, String(value));
  });
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export async function apiFetch<T>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<T> {
  const {
    method = "GET",
    body,
    query,
    headers,
    responseType = "json",
    ...rest
  } = options;

  const url = `${API_URL}/${endpoint}${buildQueryString(query)}`;
  const deviceId = localStorage.getItem("deviceId");
  const visitorId = getVisitorId();

  const res = await fetch(url, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...headers,
      [DEVICE_ID]: deviceId || "",
      [DEVICE_VISITOR]: visitorId || "",
    },
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  });

  // Error handling
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    try {
      const errorContent = JSON.parse(text);
      return Promise.reject(errorContent);
    } catch {
      throw new Error(`HTTP ${res.status}: ${text}`);
    }
  }

  // Try parse JSON, else return raw text
  // try {
  //   return (await res.json()) as T;
  // } catch {
  //   return {} as T;
  // }

  switch (responseType) {
    case "blob":
      return (await res.blob()) as T;

    case "text":
      return (await res.text()) as T;

    case "arrayBuffer":
      return (await res.arrayBuffer()) as T;

    case "void":
      return undefined as T;

    default:
      return (await res.json()) as T;
  }
}
