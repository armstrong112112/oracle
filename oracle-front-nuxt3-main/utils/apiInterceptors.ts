import type { Ref } from "vue";

type ApiRequestOptions = Omit<RequestInit, "headers"> & {
  headers?: HeadersInit;
  [key: string]: unknown;
};

interface ApiRequestContext {
  request?: RequestInfo;
  options: ApiRequestOptions;
}

interface ApiResponseErrorContext {
  request: RequestInfo;
  response: Response;
  error?: unknown;
}

interface InterceptorOverrides {
  onRequest?: (ctx: ApiRequestContext) => Promise<void> | void;
  onResponseError?: (ctx: ApiResponseErrorContext) => Promise<void> | void;
}

type NuxtAppWithRefresh = ReturnType<typeof useNuxtApp> & {
  _refreshPromise?: Promise<void> | null;
};

interface RefreshTokenResponse {
  accessToken?: string;
  refreshToken?: string;
}

interface ApiInterceptorOptions extends InterceptorOverrides {
  accessToken: Ref<string | null | undefined>;
  refreshToken?: Ref<string | null | undefined>;
  nuxtApp?: NuxtAppWithRefresh;
  refreshUrl?: string;
  redirectUrl?: string;
  fetcher?: ApiFetcher;
}

type FetcherOptions = Parameters<typeof $fetch>[1];
type ApiFetcher = <T = unknown>(request: string, options?: FetcherOptions) => Promise<T>;

export class ApiRefreshRequiredError extends Error {
  constructor(message = "Token refreshed, retry request") {
    super(message);
    this.name = "ApiRefreshRequiredError";
  }
}

export function getApiInterceptors(options: ApiInterceptorOptions) {
  const accessToken = options.accessToken;
  const refreshToken = options.refreshToken;
  const nuxtApp = options.nuxtApp ?? (useNuxtApp() as NuxtAppWithRefresh);
  const refreshUrl = options.refreshUrl ?? "/auth/refresh";
  const redirectUrl = options.redirectUrl ?? "/auth/sign-in";
  const fallbackFetcher: ApiFetcher = async <T = unknown>(request: string, options?: FetcherOptions) => {
    if (import.meta.server) {
      return useRequestFetch()<T>(request, options);
    }

    return $fetch<T>(request, options);
  };
  const fetcher: ApiFetcher = options.fetcher ?? fallbackFetcher;

  const clearSessionAndRedirect = async () => {
    accessToken.value = null;

    if (refreshToken) {
      refreshToken.value = null;
    }

    await nuxtApp.runWithContext(() => navigateTo(redirectUrl, { replace: true }));
  };

  const refreshSession = async () => {
    if (!refreshToken?.value) {
      throw new Error("Missing refresh token");
    }

    const refreshed = await fetcher<RefreshTokenResponse>(refreshUrl, {
      baseURL: "/api/v1",
      method: "POST",
      body: {
        refreshToken: refreshToken.value,
      },
    });

    accessToken.value = refreshed.accessToken ?? null;

    if (refreshToken) {
      refreshToken.value = refreshed.refreshToken ?? refreshToken.value;
    }
  };

  const getRefreshPromise = () => {
    if (!nuxtApp._refreshPromise) {
      nuxtApp._refreshPromise = nuxtApp
        .runWithContext(async () => {
          await refreshSession();
        })
        .finally(() => {
          nuxtApp._refreshPromise = null;
        });
    }

    return nuxtApp._refreshPromise;
  };

  return {
    async onRequest(ctx: ApiRequestContext) {
      if (accessToken.value) {
        const headers = new Headers(ctx.options.headers ?? {});
        headers.set("Authorization", `Bearer ${accessToken.value}`);
        ctx.options.headers = headers;
      }

      await options.onRequest?.(ctx);
    },

    async onResponseError(ctx: ApiResponseErrorContext) {
      await options.onResponseError?.(ctx);

      if (ctx.response.status >= 500) {
        console.error("API server error", {
          status: ctx.response.status,
          request: String(ctx.request),
        });
      }

      if (ctx.response.status !== 401) {
        return;
      }

      const requestUrl =
        typeof ctx.request === "string"
          ? ctx.request
          : ctx.request instanceof Request
            ? ctx.request.url
            : String(ctx.request);
      const isRefreshCall = requestUrl.includes("/auth/refresh");

      if (isRefreshCall) {
        await clearSessionAndRedirect();
        throw new Error("Unauthorized during refresh");
      }

      try {
        await getRefreshPromise();
      } catch (error) {
        if (error instanceof ApiRefreshRequiredError) {
          throw error;
        }

        await clearSessionAndRedirect();
        throw error;
      }

      throw new ApiRefreshRequiredError();
    },
  };
}
