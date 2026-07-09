import type { CardData } from "../model/card";

export const mockCards: CardData[] = [
  {
    cardNumber: '3778489339021234',
    cardHolderName: 'IVAN IVANOV',
    expiryDate: '05/24',
    cvc: '123',
    cardType: 'default',
    balance: {
      amount: 1250.50,
      currency: 'USD',
      changePercent: 2.5,
      changeDirection: 'up'
    }
  },
  {
    cardNumber: '4111111111111111',
    cardHolderName: 'MARIA PETROVA',
    expiryDate: '12/25',
    cvc: '456',
    cardType: 'premium',
    balance: {
      amount: 3420.75,
      currency: 'USD',
      changePercent: 1.8,
      changeDirection: 'up'
    }
  },
  {
    cardNumber: '5555555555554444',
    cardHolderName: 'ALEX SMITH',
    expiryDate: '08/26',
    cvc: '789',
    cardType: 'vip',
    balance: {
      amount: 8750.25,
      currency: 'USD',
      changePercent: 0.5,
      changeDirection: 'down'
    }
  },
  {
    cardNumber: '4111111111111111',
    cardHolderName: 'MARIA PETROVA',
    expiryDate: '12/25',
    cvc: '456',
    cardType: 'premium',
    balance: {
      amount: 2100.00,
      currency: 'USD',
      changePercent: 3.2,
      changeDirection: 'up'
    }
  },
  {
    cardNumber: '3778489339021234',
    cardHolderName: 'IVAN IVANOV',
    expiryDate: '05/24',
    cvc: '123',
    cardType: 'default',
    balance: {
      amount: 890.30,
      currency: 'USD',
      changePercent: 1.1,
      changeDirection: 'down'
    }
  },
  {
    cardNumber: '5555555555554444',
    cardHolderName: 'ALEX SMITH',
    expiryDate: '08/26',
    cvc: '789',
    cardType: 'vip',
    balance: {
      amount: 15600.80,
      currency: 'USD',
      changePercent: 4.7,
      changeDirection: 'up'
    }
  },
] 