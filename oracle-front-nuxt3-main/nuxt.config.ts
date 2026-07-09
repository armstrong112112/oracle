//@ts-ignore
import svgLoader from "vite-svg-loader";
//@ts-ignore

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  app: {
    head: {
      title: "oracle-frontend",
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  css: ["~/assets/styles/main.css"],

  plugins: [
    { src: "~/plugins/vue-tel-input.js", mode: "client" },
    { src: "~/plugins/swiper.ts", mode: "client" },
    { src: "~/plugins/apexcharts.client.ts", mode: "client" },
    { src: "~/plugins/gsap.client.ts", mode: "client" },
  ],

  components: true,

  modules: ["@nuxtjs/i18n", "@pinia/nuxt"],

  i18n: {
    langDir: "locales/",
    locales: [
      { code: "en", name: "English", file: "en/locale/index.ts" },
      { code: "ru", name: "Русский", file: "ru/locale/index.ts" },
    ],
    defaultLocale: "en",
    strategy: "prefix_except_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },

  router: { options: { strict: false } },

  runtimeConfig: {
    apiBaseUrl: process.env.NUXT_API_BASE_URL || "http://localhost:3001",
    telegramToken: process.env.NUXT_TELEGRAM_TOKEN || "",
    public: {
      useMocks: process.env.NUXT_PUBLIC_USE_MOCKS === "true",
      vendureGraphqlUrl:
        process.env.NUXT_PUBLIC_VENDURE_URL || "http://localhost:3100/shop-api",
    },
  },

  vite: {
    plugins: [svgLoader()],
  },

  hooks: {
    "pages:extend"(pages) {
      const publicRoutes = [
        "/",
        "/landing",
        "/auth",
        "/auth/sign-in",
        "/auth/sign-in-with-telegram",
        "/auth/sign-up",
        "/auth/sign-up-with-telegram",
      ];

      const isPublicRoute = (path: string) =>
        publicRoutes.some((route) => path === route || path.startsWith(`${route}/`));

      pages.forEach((page: { path?: string; meta?: { middleware?: string | string[] } }) => {
        const path = page.path ?? "/";
        const currentMiddleware = page.meta?.middleware;
        const isGuestRoute =
          currentMiddleware === "guest" ||
          (Array.isArray(currentMiddleware) && currentMiddleware.includes("guest"));

        if (isPublicRoute(path) || isGuestRoute) {
          return;
        }

        const middleware = Array.isArray(currentMiddleware)
          ? currentMiddleware
          : currentMiddleware
            ? [currentMiddleware]
            : [];

        if (!middleware.includes("auth")) {
          page.meta = {
            ...(page.meta || {}),
            middleware: [...middleware, "auth"],
          };
        }
      });
    },
  },
});
