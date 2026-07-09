export interface Coin {
  id: number,
  img: string,
  name: string,
  change: number,
  amount: number,
  cardNumber: number,
  usdValue: string, // '$1233.32', советую юзать все же number и избавиться от $
}

export interface DifCoin {
  id: number,
  img: string,
  name: string,
  change: number,
  amount: number,
}