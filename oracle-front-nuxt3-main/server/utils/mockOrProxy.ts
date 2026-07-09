import type { H3Event } from "h3";

export type MockRouteHandler = (event: H3Event) => Promise<unknown> | unknown;

export function withMockOrProxy(
  event: H3Event,
  path: string,
  mockHandler: MockRouteHandler,
) {
  const config = useRuntimeConfig();

  if (!config.public.useMocks) {
    return proxyToBackend(event, path);
  }

  return mockHandler(event);
}

