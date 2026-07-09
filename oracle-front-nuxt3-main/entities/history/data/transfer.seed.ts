import type { TransferData } from '../model/transfer.type'

export const transferData: TransferData = {
  title: 'External Transfer Sent!',
  coinIcon: '/svg/litecoin-ltc.svg',
  actionButtonText: 'Go Back', // This will be localized in the component
  dataItems: [
    [
      { title: 'Date', value: 'Feb 20, 2025' },
      { title: 'Time', value: '11:23 AM' },
    ],
    [{ title: 'Network', value: 'Bitcoin Network' }],
    [
      {
        title: 'TxID',
        value: '0x7a2b382989839211c34',
        copy: true,
      },
    ],
    [
      {
        title: 'Sent from',
        value: '***3213',
        icon: '/svg/litecoin-ltc.svg',
      },
    ],
    [
      {
        title: 'To',
        value: 'odsj2J9023jklLKD909210321312Das',
      },
    ],
    [{ title: 'Comment', value: 'Payment for services' }],
    [
      {
        title: 'Amount Sent',
        value: { value: '101', currency: 'USDT', usdEquivalent: '$98.98' },
        type: 'total',
      },
      {
        title: 'Amount to be Received',
        value: { value: '100', currency: 'USDT', usdEquivalent: '$98.98' },
        type: 'total',
      },
    ],
    [
      {
        title: 'Fees',
        value: { value: '0.05', currency: 'BTC', usdEquivalent: '$5 USD' },
        type: 'issuance',
      },
    ],
  ],
}

export const escrowData: TransferData = {
  title: 'Escrow Transaction Details',
  coinIcon: '/svg/litecoin-ltc.svg',
  coinName: 'LTC',
  dataItems: [
    [
      { title: 'Date', value: 'Feb 20, 2025' },
      { title: 'Time', value: '11:23 AM' },
    ],
    [
      { title: 'ID', value: 'ESC-10932' },
      { title: 'Status', value: 'Completed' },
    ],
    [{ title: 'Type', value: 'Escrow Payment' }],
    [
      {
        title: 'Counterparty',
        value: 'User name',
        icon: '/png/zaglushka.png',
        iconRight: true,
      },
    ],
    [
      {
        title: 'Paid with',
        value: '***3213',
        icon: '/svg/litecoin-ltc.svg',
      },
    ],
    [{ title: 'Reason', value: 'Funds for Deal #11245 are held in Escrow.' }],
    [
      {
        title: 'Paid',
        value: { value: '100', currency: 'USDT', usdEquivalent: '$98.98' },
        type: 'total',
      },
    ],
    [
      {
        title: 'Including Fees',
        value: { value: '0.05', currency: 'BTC', usdEquivalent: '$5 USD' },
        type: 'issuance',
      },
    ],
  ],
  actionButtonText: 'Go to Deal Page',
}

export const mixingData = {
  title: 'Mixing Refund Details',
  coinIcon: '/svg/litecoin-ltc.svg',
  coinName: 'LTC',
  dataItems: [
    [
      { title: 'Date', value: 'Feb 20, 2025' },
      { title: 'Time', value: '11:23 AM' },
    ],
    [
      { title: 'MIX ID', value: 'MIX-2023-00123' },
      { title: 'Status', value: 'Completed' },
    ],
    [{ title: 'Type', value: 'Mixing Refund' }],
    [
      {
        title: 'Amount',
        value: { value: '0.5', currency: 'BTC', usdEquivalent: '$98.98' },
        type: 'total',
      },
    ],
    [
      {
        title: 'Net Amount Received',
        value: { value: '24.5', currency: 'ETH', usdEquivalent: '$98.98' },
        type: 'received',
      },
    ],
    [
      {
        title: 'Service Fee',
        value: { value: '0.5', currency: 'BTC', usdEquivalent: '$98.98' },
        type: 'fee',
      },
    ],
  ],
  actionButtonText: 'Learn more',
}

export const historyData = [
  {
    id: 1,
    date: 'March 20, 2025',
    expenses: [
      {
        _id: 1,
        img: '/svg/btc.svg',
        description: 'Internal Deposit',
        amount: '0,0244 TON',
        title: 'From: @UserUser',
        price: '100.234$',
        type: 'internal',
      },
      {
        _id: 2,
        img: '/svg/ton.svg',
        description: 'External Deposit',
        amount: '0,0244 TON',
        title: 'From: UQc459892idsao...3f2b',
        price: '100.234$',
        type: 'external',
      },
    ],
  },
]

export const expensisData = [
  {
    id: 1,
    to: '',
    name: 'Internal Deposit',
    price: '$1289',
    color: 'color-escrow',
  },
  {
    id: 2,
    to: '',
    name: 'External Deposit',
    price: '$1289',
    color: 'color-escrow',
  },
]

export const depositData = [
  {
    id: 1,
    to: '',
    name: 'Internal transfers',
    price: '$1289',
    color: 'color-escrow',
  },
  {
    id: 2,
    to: '',
    name: 'External Transfer',
    price: '$1289',
    color: 'color-escrow',
  },
]

export const expensisMoreData = [
  {
    id: 1,
    to: '/history/escrow',
    name: 'Escrow',
    price: '$1,923.15',
    color: 'color-escrow',
  },
  {
    id: 2,
    to: '/history/p2p',
    name: 'P2P',
    price: '$1,923.15',
    color: 'color-p2p',
  },
  {
    id: 3,
    to: '/history/swap',
    name: 'SWAP',
    price: '$1,923.15',
    color: 'color-swap',
  },
  {
    id: 4,
    to: '/history/transfers',
    name: 'Transfers',
    price: '$1,923.15',
    color: 'color-transfers',
  },
  {
    id: 5,
    to: '/history/prepaid',
    name: 'Prepaid Cards',
    price: '$1,923.15',
    color: 'color-prepaid',
  },
  {
    id: 6,
    to: '/history/bills',
    name: 'Bills',
    price: '$1,923.15',
    color: 'color-bills',
  },
  {
    id: 7,
    to: '/history/fees',
    name: 'Fees',
    price: '$1,923.15',
    color: 'color-fees',
  },
  {
    id: 8,
    to: '/history/mixing',
    name: 'Mixing',
    price: '$1,923.15',
    color: 'color-mixing',
  },
  {
    id: 9,
    to: '/history/shops',
    name: 'Shops',
    price: '$1,923.15',
    color: 'color-shops',
  },
  {
    id: 10,
    to: '/history/oracle-pay',
    name: 'OraclePay',
    price: '$1,923.15',
    color: 'color-oracle-pay',
  },
  {
    id: 11,
    to: '/history/checks',
    name: 'Checks',
    price: '$1,923.15',
    color: 'color-checks',
  },
]

export const depositMoreData = [
  {
    id: 1,
    to: '/history/escrow',
    name: 'Escrow',
    price: '$1,923.15',
    color: 'color-escrow',
  },
  {
    id: 2,
    to: '/history/p2p',
    name: 'P2P',
    price: '$1,923.15',
    color: 'color-p2p',
  },
  {
    id: 3,
    to: '/history/swap',
    name: 'SWAP',
    price: '$1,923.15',
    color: 'color-swap',
  },
  {
    id: 4,
    to: '/history/transfers',
    name: 'Transfers',
    price: '$1,923.15',
    color: 'color-transfers',
  },
  {
    id: 5,
    to: '/history/prepaid',
    name: 'Prepaid Cards',
    price: '$1,923.15',
    color: 'color-prepaid',
  },
  {
    id: 6,
    to: '/history/bills',
    name: 'Bills',
    price: '$1,923.15',
    color: 'color-bills',
  },
  {
    id: 7,
    to: '/history/fees',
    name: 'Fees',
    price: '$1,923.15',
    color: 'color-fees',
  },
  {
    id: 8,
    to: '/history/mixing',
    name: 'Mixing',
    price: '$1,923.15',
    color: 'color-mixing',
  },
  {
    id: 9,
    to: '/history/shops',
    name: 'Shops',
    price: '$1,923.15',
    color: 'color-shops',
  },
  {
    id: 10,
    to: '/history/oraclepay',
    name: 'OraclePay',
    price: '$1,923.15',
    color: 'color-oracle-pay',
  },
  {
    id: 11,
    to: '/history/checks',
    name: 'Checks',
    price: '$1,923.15',
    color: 'color-checks',
  },
]

export const historyMoreData = [
  {
    id: 1,
    date: 'March 20, 2025',
    expenses: [
      {
        _id: 1,
        img: '/svg/btc.svg',
        title: 'O-Pay Dep.',
        amount: '0,0244 TON',
        description: 'Telegram Shop API Keys',
        price: '100.234$',
      },
      {
        _id: 2,
        img: '/svg/ton.svg',
        title: 'O-Pay Dep.',
        amount: '0,0244 TON',
        description: 'Telegram Shop API Keys',
        price: '100.234$',
      },
    ],
  },
  {
    id: 2,
    date: 'March 20, 2025',
    expenses: [
      {
        _id: 1,
        img: '/svg/litecoin-ltc.svg',
        title: 'O-Pay Dep.',
        amount: '0,0244 TON',
        description: 'Telegram Shop API Keys',
        price: '154.111$',
      },
      {
        _id: 2,
        img: '/svg/eth.svg',
        title: 'O-Pay Dep.',
        amount: '0,0244 TON',
        description: 'Telegram Shop API Keys',
        price: '84.455$',
      },
      {
        _id: 3,
        img: '/svg/litecoin-ltc.svg',
        title: 'O-Pay Dep.',
        amount: '0,0244 TON',
        description: 'Telegram Shop API Keys',
        price: '84.455$',
      },
    ],
  },
  {
    id: 3,
    date: 'March 20, 2025',
    expenses: [
      {
        _id: 1,
        img: '/svg/litecoin-ltc.svg',
        title: 'O-Pay Dep.',
        amount: '0,0244 TON',
        description: 'Telegram Shop API Keys',
        price: '154.111$',
      },
      {
        _id: 2,
        img: '/svg/eth.svg',
        title: 'O-Pay Dep.',
        amount: '0,0244 TON',
        description: 'Telegram Shop API Keys',
        price: '84.455$',
      },
    ],
  },
  {
    id: 4,
    date: 'March 20, 2025',
    expenses: [
      {
        _id: 1,
        img: '/svg/btc.svg',
        title: 'O-Pay Dep.',
        amount: '0,0244 TON',
        description: 'Telegram Shop API Keys',
        price: '100.234$',
      },
      {
        _id: 2,
        img: '/svg/ton.svg',
        title: 'O-Pay Dep.',
        amount: '0,0244 TON',
        description: 'Telegram Shop API Keys',
        price: '100.234$',
      },
    ],
  },
]
