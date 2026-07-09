import { useAuthSession } from "~/composables/useAuthSession";

export default defineNuxtRouteMiddleware((to) => {
  const localePath = useLocalePath();
  const { accessToken, refreshToken, hasValidAccessToken, clearAuthSession } = useAuthSession();

  const normalizedPath = to.path.replace(/^\/(en|ru)(?=\/|$)/, "") || "/";
  const publicRoutes = [
    "/",
    "/landing",
    "/auth",
    "/auth/sign-in",
    "/auth/sign-in-with-telegram",
    "/auth/sign-up",
    "/auth/sign-up-with-telegram",
  ];

  const isPublicRoute = publicRoutes.some(
    (route) => normalizedPath === route || normalizedPath.startsWith(`${route}/`),
  );

  if (isPublicRoute) {
    return;
  }

  if (!accessToken.value && !refreshToken.value) {
    return navigateTo(localePath("/auth/sign-in"), { replace: true });
  }

  if (accessToken.value && !hasValidAccessToken.value) {
    clearAuthSession();
    return navigateTo(localePath("/auth/sign-in"), { replace: true });
  }
});
