import type { Ref } from "vue";
import type { FetchOptions } from "ofetch";
import { ApiRefreshRequiredError, getApiInterceptors } from "~/utils/apiInterceptors";

type FetcherOptions = Parameters<typeof $fetch>[1];
type ApiFetcher = <T = unknown>(request: string, options?: FetcherOptions) => Promise<T>;

type NuxtAppWithRefresh = ReturnType<typeof useNuxtApp> & {
  _refreshPromise?: Promise<void> | null;
};

type RequestLifecycleContext = {
  request: string;
  options: FetcherOptions;
};

type ResponseErrorContext = {
  request: string | Request;
  response: Response;
  error: unknown;
};

export interface HttpClientRequestOptions<T> extends Omit<FetchOptions<"json">, "responseType"> {
  responseType?: string;
  onResponseError?: (ctx: ResponseErrorContext) => Promise<void> | void;
  onRequest?: (ctx: RequestLifecycleContext) => Promise<void> | void;
}

interface CreateApiClientOptions {
  accessToken: Ref<string | null | undefined>;
  refreshToken?: Ref<string | null | undefined>;
  nuxtApp: NuxtAppWithRefresh;
  fetcher?: ApiFetcher;
  onRequest?: (ctx: RequestLifecycleContext) => Promise<void> | void;
  onResponseError?: (ctx: ResponseErrorContext) => Promise<void> | void;
  baseURL?: string;
  refreshUrl?: string;
  redirectUrl?: string;
}

export function createApiClient({
  accessToken,
  refreshToken,
  nuxtApp,
  fetcher,
  onRequest,
  onResponseError,
  baseURL = "/api/v1",
  refreshUrl = "/auth/refresh",
  redirectUrl = "/auth/sign-in",
}: CreateApiClientOptions) {
  const requestFetcher = fetcher ?? ((import.meta.server ? useRequestFetch() : $fetch) as ApiFetcher);
  const interceptors = getApiInterceptors({
    accessToken,
    refreshToken,
    nuxtApp,
    refreshUrl,
    redirectUrl,
    fetcher: requestFetcher,
    onRequest,
    onResponseError(ctx) {
      return onResponseError?.(ctx);
    },
  });

  const executeRequest = async <T>(
    request: string,
    opts: HttpClientRequestOptions<T> = {},
    retry = true,
  ): Promise<T> => {
    try {
      const requestOptions = {
        baseURL,
        ...opts,
        async onRequest(ctx: { options: FetcherOptions }) {
          await interceptors.onRequest({ options: ctx.options, request });
          await opts.onRequest?.({ request, options: ctx.options });
        },
        async onResponseError(ctx: ResponseErrorContext) {
          await interceptors.onResponseError({
            request: ctx.request,
            response: ctx.response,
            error: ctx.error,
          });
          await opts.onResponseError?.(ctx);
        },
      } as FetcherOptions;

      return await requestFetcher<T>(request, requestOptions);
    } catch (error) {
      if (retry && error instanceof ApiRefreshRequiredError) {
        return executeRequest<T>(request, opts, false);
      }

      throw error;
    }
  };

  return <T>(request: string, opts?: HttpClientRequestOptions<T>) => executeRequest<T>(request, opts);
}
