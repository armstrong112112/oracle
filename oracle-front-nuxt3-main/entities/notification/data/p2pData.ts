// p2pData.ts

export interface P2PNotificationItem {
  id: string
  title: string
  timestamp: string
  read: boolean
  category: 'all' | 'buy' | 'sell' | 'disputes' | 'emergency'
  date: string
  amount?: string
  type?: string
  status?: string
  action?: string
  user?: {
    name: string
    avatar: string
  }
}

export const p2pData: P2PNotificationItem[] = [
  {
    id: '1',
    title: 'p2pReceived',
    timestamp: '12:03',
    read: false,
    category: 'buy',
    date: 'March 20, 2025',
    type: 'p2pBuy',
    action: 'rate',
  },
  {
    id: '2',
    title: 'p2pSold',
    timestamp: '12:03',
    read: false,
    category: 'sell',
    date: 'March 20, 2025',
    type: 'p2pSell',
    action: 'rate',
  },
  {
    id: '3',
    title: 'p2pSold',
    timestamp: '12:03',
    read: false,
    category: 'disputes',
    date: 'March 20, 2025',
    type: 'p2pDispute',
    amount: '0.12 BTC',
  },
  {
    id: '4',
    title: 'p2pDispute',
    timestamp: '12:03',
    read: false,
    category: 'disputes',
    date: 'March 20, 2025',
    type: 'p2pDisputeOpened',
    amount: '0.12 BTC',
    user: {
      name: 'Barbara Martinez',
      avatar: '/avatars/barbara.png',
    },
    action: 'submitEvidence',
  },
  {
    id: '5',
    title: 'p2pDispute',
    timestamp: '12:03',
    read: false,
    category: 'disputes',
    date: 'March 20, 2025',
    type: 'p2pDisputeModerator',
    amount: '0.12 BTC',
    user: {
      name: 'Barbara Martinez',
      avatar: '/avatars/barbara.png',
    },
  },
  {
    id: '6',
    title: 'p2pDisputeResolved',
    timestamp: '12:03',
    read: false,
    category: 'disputes',
    date: 'March 20, 2025',
    type: 'p2pDisputeResolved',
    status: 'p2pDecisionInFavor',
    amount: '0.12 BTC',
  },
  {
    id: '7',
    title: 'p2pTradeAtRisk',
    timestamp: '12:03',
    read: false,
    category: 'emergency',
    date: 'March 20, 2025',
    type: 'p2pEmergencyAction',
    action: 'confirmPaymentMethod',
  },
  {
    id: '8',
    title: 'p2pUnusualActivity',
    timestamp: '12:03',
    read: false,
    category: 'emergency',
    date: 'March 20, 2025',
    type: 'p2pEmergencyAction53912',
    action: 'p2pVerifyIdentity',
  },
  {
    id: '9',
    title: 'p2pSell',
    timestamp: '12:03',
    read: false,
    category: 'emergency',
    date: 'March 20, 2025',
    type: 'p2pEmergencyActionRequired',
    action: 'p2pCheckPayment',
  },
]
