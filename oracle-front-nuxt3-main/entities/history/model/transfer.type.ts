// Тип для денежного значения
export interface Amount {
  value: string
  currency: string
  usdEquivalent?: string
}

// Тип для элемента данных
export interface DataItem {
  title: string
  value: string | Amount
  icon?: string
  type?: 'total' | 'issuance'
  copy?: boolean
  iconRight?: boolean
}

// Основной тип для данных трансфера
export interface TransferData {
  title: string
  coinIcon?: string
  coinName?: string
  actionButtonText?: string
  dataItems: DataItem[][]
}