import { Coin } from './coins'
import { PaymentType } from './paymentType'
import { SortItem } from '~/shared/types/sortItems'

export interface P2PFiltersState {
  selectedCoin: Coin | null
  selectedPaymentTypes: object[] | null
  selectedAmount: string | null
  selectedSort: string | null
}

export interface P2PFiltersProps {
  cryptoList: Coin[]
  paymentTypes: PaymentType[]
  sortItems: SortItem[]
  selectedCoin: Coin | null
  selectedPaymentTypes: object[] | null
  selectedAmount: string | null
  selectedSort: string | null
  windowWidth: number
}

export interface P2PFiltersEmits {
  'select-coin': (coin: Coin) => void
  'select-payment': (payment: object[]) => void
  'select-amount': (amount: string) => void
  'select-sort': (sort: string) => void
  'close-payment': () => void
} 