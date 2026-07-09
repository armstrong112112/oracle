export interface PrepaidCardHistoryData {
  labels: string[]
  datasets: {
    data: number[];
    backgroundColor: string[];
    borderWidth: number;
  }[];
}

export interface PrepaidCardHistoryText {
  title: string
  price: string
}

export interface PrepaidCardHistoryState {
  deposit: {
    chartData: PrepaidCardHistoryData
    text: PrepaidCardHistoryText
  }
  expense: {
    chartData: PrepaidCardHistoryData
    text: PrepaidCardHistoryText
  }
}

export const prepaidCardHistoryData: PrepaidCardHistoryState = {
  deposit: {
    chartData: {
      labels: [
        'Escrow',
        'P2P',
        'Swap',
        'Transfers',
      ],
      datasets: [
        {
          data: [28, 25, 28, 19],
          backgroundColor: ['#f6c32a', '#f64e2a', '#902af6', '#2af653'],
          borderWidth: 0,
        },
      ],
    },
    text: {
      title: 'Deposit',
      price: '0.00',
    },
  },
  expense: {
    chartData: {
      labels: [
        'Shopping',
        'Services',
        'Bills',
        'Other',
      ],
      datasets: [
        {
          data: [35, 20, 25, 20],
          backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'],
          borderWidth: 0,
        },
      ],
    },
    text: {
      title: 'Expenses',
      price: '0.00',
    },
  },
}

export const getPrepaidCardHistoryData = (type: 'deposit' | 'expense'): PrepaidCardHistoryData => {
  return prepaidCardHistoryData[type].chartData
}

export const getPrepaidCardHistoryText = (type: 'deposit' | 'expense'): PrepaidCardHistoryText => {
  return prepaidCardHistoryData[type].text
} 

export const historyData = [
  {
    id: 1,
    // date: '',
    expenses: [
      {
        _id: 1,
        img: '/svg/btc.svg',
        description: 'Internal Deposit',
        amount: '0,0244 TON',
        title: 'Card Funding: $150.00',
        price: 'Visa *3232',
        type: 'internal',
      },
      {
        _id: 2,
        img: '/svg/ton.svg',
        description: 'External Deposit',
        amount: '0,0244 TON',
        title: 'Card Funding: $150.00',
        price: 'Visa *3232',
        type: 'external',
      },
      {
        _id: 6,
        img: '/svg/btc.svg',
        description: 'Internal Deposit',
        amount: '0,0244 TON',
        title: 'Card Funding: $150.00',
        price: 'Visa *3232',
        type: 'internal',
      },
      {
        _id: 3,
        img: '/svg/ton.svg',
        description: 'External Deposit',
        amount: '0,0244 TON',
        title: 'Card Funding: $150.00',
        price: 'Visa *3232',
        type: 'external',
      },
      {
        _id: 4,
        img: '/svg/btc.svg',
        description: 'Internal Deposit',
        amount: '0,0244 TON',
        title: 'Card Funding: $150.00',
        price: 'Visa *3232',
        type: 'internal',
      },
      {
        _id: 5,
        img: '/svg/ton.svg',
        description: 'External Deposit',
        amount: '0,0244 TON',
        title: 'Card Funding: $150.00',
        price: 'Visa *3232',
        type: 'external',
      },
    ],
  },
]