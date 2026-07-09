export interface AssetsNotificationItem {
  id: string
  title: string
  timestamp: string
  read: boolean
  category: 'all' | 'deposit' | 'withdrawal'
  date: string
  amount?: string
  subtitle?: string
  network?: string
}
export const assetsData: AssetsNotificationItem[] = [
  {
    id: '1',
    title: 'usdtDepositPending',
    timestamp: '12:03',
    read: false,
    category: 'deposit',
    date: 'March 20, 2025',
    amount: '500 USDT',
    network: 'bitcoinNetwork',
  },
  {
    id: '2',
    title: 'btcDepositConfirmed',
    timestamp: '12:03',
    read: false,
    category: 'deposit',
    date: 'March 20, 2025',
    amount: '0.000421 BTC',
    network: 'tronNetwork',
  },
  {
    id: '3',
    title: 'btcWithdrawalCompleted',
    timestamp: '12:03',
    read: false,
    category: 'withdrawal',
    date: 'March 20, 2025',
    amount: '0.15 BTC',
    subtitle: '3FZbg9829tjdsakljdnlsakKJSA93024X4tA',
    network: 'ethereumNetwork',
  },
  {
    id: '4',
    title: 'btcWithdrawalProcessing',
    timestamp: '12:03',
    read: false,
    category: 'withdrawal',
    date: 'March 20, 2025',
    amount: '0.15 BTC',
    subtitle: '3FZbg9829tjdsakljdnlsakKJSA93024X4tA',
    network: 'ethereumNetwork',
  },
  {
    id: '5',
    title: 'ethWithdrawalFailed',
    timestamp: '12:03',
    read: false,
    category: 'withdrawal',
    date: 'March 20, 2025',
    amount: '0.15 BTC',
    subtitle: 'insufficientGasFee',
    network: 'ethereumNetwork',
  },
]
