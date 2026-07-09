import type { UseFetchOptions } from "#app";
import { getApiInterceptors } from "~/utils/apiInterceptors";
import { useAuthSession } from "~/composables/useAuthSession";

type NuxtAppWithRefresh = ReturnType<typeof useNuxtApp> & {
  _refreshPromise?: Promise<void> | null;
};

type ApiRequestOptions = Omit<RequestInit, "headers"> & {
  headers?: HeadersInit;
  [key: string]: unknown;
};

type ApiRequestContext = {
  request: Request;
  options: ApiRequestOptions;
};

type ApiResponseErrorContext = {
  request: Request;
  response: Response;
  error: unknown;
};

type ApiFetchOptions<T> = Omit<UseFetchOptions<T>, "onRequest" | "onResponseError"> & {
  onRequest?: (ctx: ApiRequestContext) => Promise<void> | void;
  onResponseError?: (ctx: ApiResponseErrorContext) => Promise<void> | void;
};

export function useApiFetch<T>(
  request: string | (() => string),
  opts: ApiFetchOptions<T> = {},
) {
  const nuxtApp = useNuxtApp() as NuxtAppWithRefresh;
  const { accessToken, refreshToken } = useAuthSession();

  const interceptors = getApiInterceptors({
    accessToken,
    refreshToken,
    nuxtApp,
    onRequest: opts.onRequest,
    onResponseError: opts.onResponseError,
  });

  return useFetch<T>(request, {
    baseURL: "/api/v1",
    ...opts,
    async onRequest(ctx: { request: Request; options: ApiRequestOptions }) {
      await interceptors.onRequest({
        request: ctx.request,
        options: ctx.options,
      });
      await opts.onRequest?.(ctx);
    },
    async onResponseError(ctx: { request: Request; response: Response; error: unknown }) {
      await interceptors.onResponseError({
        request: ctx.request,
        response: ctx.response,
        error: ctx.error,
      });
      await opts.onResponseError?.(ctx);
    },
  });
}
