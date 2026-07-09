import { createApiClient, type HttpClientRequestOptions } from "~/shared/api/httpClient";
import { useAuthSession } from "~/composables/useAuthSession";

type NuxtAppWithRefresh = ReturnType<typeof useNuxtApp> & {
  _refreshPromise?: Promise<void> | null;
};

type ApiClientOptions<T> = HttpClientRequestOptions<T> & {
  [key: string]: unknown;
};

export function useApiClient() {
  const nuxtApp = useNuxtApp() as NuxtAppWithRefresh;
  const { accessToken, refreshToken } = useAuthSession();

  const client = createApiClient({
    accessToken,
    refreshToken,
    nuxtApp,
  });

  return <T>(request: string, opts?: ApiClientOptions<T>) => client<T>(request, opts);
}
