export interface AddressDataType {
  id: number;
  icon: string
  name: string;
  address: string;
  price: string;
  convertPrice: number;
}

export const AddressData: AddressDataType[] = [
  {
    id: 1,
    icon: '/svg/shop/images/litecoin.svg',
    name: 'Litecoin',
    address: '***2343',
    price: '0,0244 TON',
    convertPrice: 100.234
  },
  {
    id: 2,
    icon: '/svg/shop/images/xcoin.svg',
    name: 'XRP',
    address: '***2343',
    price: '244 XRP',
    convertPrice: 1000.4
  },
  {
    id: 3,
    icon: '/svg/shop/images/bitcoin.svg',
    name: 'Bitcoin',
    address: '***2343',
    price: '0,0000244 BTC',
    convertPrice: 323.2
  },
  {
    id: 4,
    icon: '/svg/shop/images/etherum.svg',
    name: 'Ethereum',
    address: '***2343',
    price: '0,1244 ETH',
    convertPrice: 565.389
  },
  {
    id: 5,
    icon: '/svg/shop/images/usdt.svg',
    name: 'USDT',
    address: '***2343',
    price: '300 USDT',
    convertPrice: 300
  },
  {
    id: 6,
    icon: '/svg/shop/images/bnb.svg',
    name: 'BNB',
    address: '***2343',
    price: '0,0244 BNB',
    convertPrice: 1003.234
  }
]
