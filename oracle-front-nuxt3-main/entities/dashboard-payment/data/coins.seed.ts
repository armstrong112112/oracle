import type { Coin } from "../model/coins.types"

export const coins: Coin[] = [
  {
    id: 1,
    img: '/svg/btc-icon.svg',
    name: 'BTC',
    change: 3,
    amount: 0.00320321,
    cardNumber: 3213,
    usdValue: '$1233.32',
  },
  {
    id: 2,
    img: '/svg/ltc-icon.svg',
    name: 'LTC',
    change: -3,
    amount: 0.00320321,
    cardNumber: 3213,
    usdValue: '$1233.32',
  },
  {
    id: 3,
    img: '/svg/ton-icon.svg',
    name: 'TON',
    change: -3,
    amount: 0.00320321,
    cardNumber: 3213,
    usdValue: '$1233.32',
  },
  {
    id: 4,
    img: '/svg/etc-icon.svg',
    name: 'ETC',
    change: -3,
    amount: 0.00320321,
    cardNumber: 3213,
    usdValue: '$1233.32',
  },
]