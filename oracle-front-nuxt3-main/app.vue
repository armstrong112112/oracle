<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { getWindowLocationOrigin } from "~/utils/clientStorage";

const route = useRoute();

const getAbsoluteUrl = (path: string) => {
  const origin = getWindowLocationOrigin();
  if (origin) {
    return `${origin}${path}`;
  }

  return path.startsWith("http") ? path : path;
};

const defaultTitle = "oracle-frontend";
const defaultDescription = "Oracle - Your trusted financial platform";
const ogImage =
  "https://82untqiso3.ufs.sh/f/UVT8GTq2evXV1cHOcekie9whDIbjRmxptQqzaEYiuyOPd68c";

useSeoMeta({
  title: defaultTitle,
  description: defaultDescription,
  ogTitle: defaultTitle,
  ogDescription: defaultDescription,
  ogImage: ogImage,
  ogImageAlt: defaultTitle,
  ogType: "website",
  ogUrl: getAbsoluteUrl(route.path),
  twitterCard: "summary_large_image",
  twitterTitle: defaultTitle,
  twitterDescription: defaultDescription,
  twitterImage: ogImage,
  twitterImageAlt: defaultTitle,
  robots: "index, follow",
  author: "Oracle",
  keywords: "oracle, finance, payment, cards",
});

useHead({
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "canonical",
      href: getAbsoluteUrl(route.path),
    },
  ],
  meta: [
    {
      name: "theme-color",
      content: "#000000",
    },
    {
      name: "apple-mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "black",
    },
  ],
});
</script>

<style lang="scss"></style>
