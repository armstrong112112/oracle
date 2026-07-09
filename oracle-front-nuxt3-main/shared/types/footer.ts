import type { Component } from 'vue'

export interface FooterItem {
  path: string
  text: string
  icon: Component
  exact?: boolean
} 