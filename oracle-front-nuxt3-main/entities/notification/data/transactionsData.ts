export interface TransactionNotificationItem {
  id: string
  title: string
  timestamp: string
  read: boolean
  icon?: string
  category: 'swap' | 'internal_transfer' | 'all'
  date: string
  amount?: string
  transactionType?: 'sent' | 'received'
  user?: {
    name: string
    avatar: string
  }
}
export const transactionsData: TransactionNotificationItem[] = [
  {
    id: '1',
    title: 'btcEthSwapSuccess',
    timestamp: '12:03',
    read: false,
    icon: '/icons/notifications/transaction-icon.svg',
    category: 'swap',
    date: 'March 20, 2025',
    amount: '0.15 ETH',
  },
  {
    id: '2',
    title: 'swapFailed',
    timestamp: '12:03',
    read: false,
    icon: '/icons/notifications/transaction-icon.svg',
    category: 'swap',
    date: 'March 20, 2025',
  },
  {
    id: '3',
    title: 'swapPending',
    timestamp: '12:03',
    read: false,
    icon: '/icons/notifications/transaction-icon.svg',
    category: 'swap',
    date: 'March 20, 2025',
  },
  {
    id: '4',
    title: 'internalTransferCompleted',
    timestamp: '12:03',
    read: false,
    icon: '/icons/notifications/transaction-icon.svg',
    category: 'internal_transfer',
    date: 'March 20, 2025',
    amount: '0.15 ETH',
    transactionType: 'sent',
    user: {
      name: 'Barbara Martinez',
      avatar: '/avatars/barbara.png',
    },
  },
  {
    id: '5',
    title: 'internalTransferCompleted',
    timestamp: '12:03',
    read: false,
    icon: '/icons/notifications/transaction-icon.svg',
    category: 'internal_transfer',
    date: 'March 20, 2025',
    amount: '0.15 ETH',
    transactionType: 'received',
    user: {
      name: 'Barbara Martinez',
      avatar: '/avatars/barbara.png',
    },
  },
]
