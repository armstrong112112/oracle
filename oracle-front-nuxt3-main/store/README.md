# STORE

This directory contains your Pinia store files.
Pinia is the official state management library for Vue.js and Nuxt 3.

## Features

- ✅ Auto-imported stores (no manual imports needed)
- ✅ TypeScript support
- ✅ Composition API style with `defineStore()`
- ✅ SSR compatible

## Usage

All stores in this directory are automatically imported. Simply use them in your components:

```vue
<script setup>
const authStore = useAuthStore();
const profileStore = useProfileStore();
</script>
```

More information about Pinia with Nuxt: [https://pinia.vuejs.org/ssr/nuxt.html](https://pinia.vuejs.org/ssr/nuxt.html)
