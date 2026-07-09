export default defineNuxtRouteMiddleware((to) => {
  const localePath = useLocalePath();
  const accessToken = useCookie<string | null>("accessToken");
  const refreshToken = useCookie<string | null>("refreshToken");

  const normalizedPath = to.path.replace(/^\/(en|ru)(?=\/|$)/, "") || "/";
  const authRoutes = [
    "/auth",
    "/auth/sign-in",
    "/auth/sign-in-with-telegram",
    "/auth/sign-up",
    "/auth/sign-up-with-telegram",
  ];

  const isAuthRoute = authRoutes.some(
    (route) => normalizedPath === route || normalizedPath.startsWith(`${route}/`),
  );

  if (isAuthRoute && (accessToken.value || refreshToken.value)) {
    return navigateTo(localePath("/dashboard"), { replace: true });
  }
});
