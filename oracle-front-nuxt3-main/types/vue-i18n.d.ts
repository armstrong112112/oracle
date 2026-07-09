// @ts-ignore
import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $t(key: string, ...args: any[]): string
    $i18n: {
      locale: string
      defaultLocale: string
      locales: any[]
      setLocale(locale: string): Promise<void>
      getRouteBaseName(route?: any): string
      switchLocalePath(locale: string): string
      localePath(route: string | object, locale?: string): string
      localeRoute(route: string | object, locale?: string): object
    }
    localePath(route: string | object, locale?: string): string
    switchLocalePath(locale: string): string
    localeRoute(route: string | object, locale?: string): object
    getRouteBaseName(route?: any): string
  }
}

declare module '@nuxt/types' {
  interface Context {
    $i18n: {
      locale: string
      defaultLocale: string
      locales: any[]
      setLocale(locale: string): Promise<void>
      getRouteBaseName(route?: any): string
      switchLocalePath(locale: string): string
      localePath(route: string | object, locale?: string): string
      localeRoute(route: string | object, locale?: string): object
    }
    localePath(route: string | object, locale?: string): string
    switchLocalePath(locale: string): string
    localeRoute(route: string | object, locale?: string): object
    getRouteBaseName(route?: any): string
  }
}
