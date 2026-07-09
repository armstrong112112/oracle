import type { PaymentType } from '~/entities/p2p/model/paymentType'

export const paymentTypes: PaymentType[] = [
  {
    value: 'card',
    title: 'Card',
    name: 'Nikita',
    surname: 'Chizhik',
    currency: 'USD',
    cardNumber: '1234567890',
  },
  {
    value: 'bank',
    title: 'Bank',
    name: 'Alex',
    surname: 'Kuznetsov',
    currency: 'RUB',
    cardNumber: '1234567890',
  },
  {
    value: 'crypto',
    title: 'Crypto',
    name: 'Dmitriy',
    surname: 'Komarov',
    currency: 'RUB',
    cardNumber: '1234567890',
  },
  {
    value: 'visa',
    title: 'Visa',
    name: 'Zhanna',
    surname: 'Kovalenko',
    currency: 'KZT',
    cardNumber: '1234567890',
  },
  {
    value: 'mastercard',
    title: 'Mastercard',
    name: 'Oleg',
    surname: 'Olegov',
    currency: 'TMT',
    cardNumber: '1234567890',
  }
]