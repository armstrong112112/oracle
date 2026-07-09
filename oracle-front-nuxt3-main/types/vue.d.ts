declare module '*.vue' {
  import Vue, { VueConstructor } from 'vue'
  const component: VueConstructor<Vue>
  export default component
} 