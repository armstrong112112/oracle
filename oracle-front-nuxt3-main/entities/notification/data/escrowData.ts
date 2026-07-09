export interface EscrowNotificationItem {
  id: string
  title: string
  timestamp: string
  read: boolean
  category: string
  date: string
  fee: string
  amount?: string
  type?: string
  status?: string
  action?: string
  user?: {
    name: string
    avatar: string
  }
}

export const escrowData: EscrowNotificationItem[] = [
  {
    id: '1',
    title: 'logoDesignReleased',
    timestamp: '12:03',
    read: false,
    fee: 'feeValue',
    category: 'buy',
    date: 'March 20, 2025',
    type: 'escrowNumber',
    action: 'rate',
  },
]
