export interface AccountNotificationItem {
  id: string
  title: string
  timestamp: string
  read: boolean
  category: string
  date: string
  amount?: string
  type?: string
  status?: string
  subtitle?: string
  action?: string
  alert?: string
  user?: {
    name: string
    avatar: string
  }
}

export const accountData: AccountNotificationItem[] = [
  {
    id: '1',
    title: 'newDeviceLoggedIn',
    timestamp: '12:03',
    subtitle: 'deviceLocation',
    alert: 'secureAccount',
    read: false,
    category: 'buy',
    date: 'March 20, 2025',
    action: 'secure',
  },
  {
    id: '2',
    title: 'passwordChanged',
    subtitle: 'allSessionsLoggedOut',
    timestamp: '12:03',
    read: false,
    category: 'buy',
    date: 'March 20, 2025',
  },
]
