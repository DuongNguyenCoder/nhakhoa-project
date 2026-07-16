import { z } from "zod";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_URL) {
  throw new Error("Missing NEXT_PUBLIC_API_URL");
}

class HttpError extends Error {
  constructor(status, message, data = null) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

function buildQuery(query = {}) {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  });

  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export async function http(options = {}, schema) {
  const {
    path,
    method = "GET",
    body,
    query,
    headers = {},
    init = {},
    credentials,
  } = options;

  const url = `${BASE_URL}${path}${buildQuery(query)}`;

  const finalHeaders = {
    ...headers,
    ...((init && init.headers) || {}),
  };

  // console.log("FETCH URL:", url);
  // console.log("HEADERS:", finalHeaders);
  // console.log("CREDENTIALS:", credentials);

  let finalBody;

  if (!["GET", "HEAD"].includes(method) && body !== undefined) {
    if (body instanceof FormData) {
      finalBody = body;
    } else {
      finalBody = JSON.stringify(body);
      finalHeaders["Content-Type"] = "application/json";
    }
  }

  // Default to sending credentials (cookies) so authenticated requests include JWT.
  // Callers can override by passing `credentials` in options (e.g. undefined/null/'omit')
  const fetchCredentials = credentials ?? init.credentials ?? "include";

  const res = await fetch(url, {
    ...init,
    method,
    headers: finalHeaders,
    body: finalBody,
    credentials: fetchCredentials,
  });

  const contentType = res.headers.get("content-type");

  const data = contentType?.includes("application/json")
    ? await res.json()
    : null;

  if (!res.ok) {
    throw new HttpError(res.status, data?.message || "Request failed", data);
  }

  return schema ? schema.parse(data) : data;
}
