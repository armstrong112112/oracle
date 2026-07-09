export interface CheckItem {
  amount: string
  usdValue: string
  remaining: string
  perActivation: string
  rate: string
  status: 'Claimed' | 'Unclaimed'
  createdOn: string
}