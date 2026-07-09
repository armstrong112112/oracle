// Nuxt 2 - правильная типизация
import type { Route } from 'vue-router'
import type VueRouter from 'vue-router'

export type StoreQueryType =
  | 'seller'
  | 'create'
  | 'form'
  | 'fortune'
  | 'result'
  | undefined

export function getStoreQuery($route: Route): StoreQueryType {
  return $route.query.store as StoreQueryType
}

export function clearStoreQuery($router: VueRouter): Promise<Route> {
  return $router.replace({ query: {} })
}
