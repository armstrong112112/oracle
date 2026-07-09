export interface FeeResult {
  fee: number
  netAmount: number
  netAmountInteger: string
  netAmountDecimal: string
}

export function calculateNetAmount(amount: string, feePercent: number): FeeResult {
  const amountNum = parseFloat(amount) || 0
  const fee = parseFloat(((amountNum * feePercent) / 100).toFixed(2))
  const netAmount = parseFloat((amountNum - fee).toFixed(2))
  const [integer, decimal] = netAmount.toFixed(2).split('.')

  return {
    fee,
    netAmount,
    netAmountInteger: integer,
    netAmountDecimal: decimal,
  }
}
