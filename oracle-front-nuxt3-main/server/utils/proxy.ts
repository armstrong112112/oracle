import type { H3Event } from "h3";

/**
 * Proxy request to the backend API gateway.
 * Used when NUXT_PUBLIC_USE_MOCKS=false.
 */
export async function proxyToBackend(event: H3Event, path: string) {
  const config = useRuntimeConfig();
  const apiBaseUrl = config.apiBaseUrl as string;

  const targetUrl = `${apiBaseUrl}${path}`;

  return proxyRequest(event, targetUrl);
}
