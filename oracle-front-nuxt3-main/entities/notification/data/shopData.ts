export interface ShopNotificationItem {
  id: string
  title: string
  timestamp: string
  read: boolean
  category: string
  date: string
  amount?: string
  type?: string
  status?: string
  action?: string
  user?: {
    name: string
    avatar: string
  }
  fee?: string
}

export const shopData: ShopNotificationItem[] = [
  {
    id: '1',
    title: 'paymentProcessed',
    timestamp: '12:03',
    read: false,
    category: 'buy',
    date: 'March 20, 2025',
    type: 'orderConfirmed',
  },
  {
    id: '1',
    title: 'licenseKey',
    timestamp: '12:03',
    read: false,
    category: 'buy',
    date: 'March 20, 2025',
    type: 'orderActivated',
  },
]
