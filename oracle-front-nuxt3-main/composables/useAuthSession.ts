import { computed } from "vue";

interface AuthSessionPayload {
  accessToken?: string | null;
  refreshToken?: string | null;
}

const getCookieSecureOption = () => {
  if (import.meta.client) {
    return window.location.protocol === "https:";
  }

  const forwardedProto = useRequestHeader("x-forwarded-proto");
  return forwardedProto === "https";
};

export function useAuthSession() {
  const accessToken = useCookie<string | null>("accessToken", {
    path: "/",
    maxAge: 60 * 15,
    sameSite: "lax",
    secure: getCookieSecureOption(),
    default: () => null,
  });

  const refreshToken = useCookie<string | null>("refreshToken", {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
    secure: getCookieSecureOption(),
    default: () => null,
  });

  const isAuthenticated = computed(() => Boolean(accessToken.value || refreshToken.value));
  const hasValidAccessToken = computed(() => {
    if (!accessToken.value) {
      return false;
    }

    return accessToken.value.split(".").length === 3;
  });

  const clearAuthSession = () => {
    accessToken.value = null;
    refreshToken.value = null;
  };

  const syncAuthSession = (session: AuthSessionPayload) => {
    accessToken.value = session.accessToken || null;
    refreshToken.value = session.refreshToken || null;
  };

  return {
    accessToken,
    refreshToken,
    isAuthenticated,
    hasValidAccessToken,
    clearAuthSession,
    syncAuthSession,
  };
}

