export interface ActiveDealItem {
  date: string;
  type: string;
  handle: string;
  amount: string;
  usdValue: string;
  icon: string
}

export const activeDealsData: ActiveDealItem[] = [

  {
    date: "March 20, 2025",
    type: "Deal With",
    handle: "@NickName",
    amount: "0,0244 TON",
    usdValue: "≈ 100,234$",
    icon: '/icons/oracle-pay/crypto/btc.svg'
  },
  {
    date: "March 20, 2025",
    type: "Pending",
    handle: "#321321",
    amount: "0,0244 TON",
    usdValue: "≈ 100,234$",
    icon: '/icons/oracle-pay/crypto/btc.svg'
  },
  {
    date: "March 20, 2025",
    type: "Success",
    handle: "#321321",
    amount: "0,0244 TON",
    usdValue: "≈ 100,234$",
    icon: '/icons/oracle-pay/crypto/btc.svg'
  },
  {
    date: "March 19, 2025",
    type: "Deal With",
    handle: "@NickName",
    amount: "0,0244 TON",
    usdValue: "≈ 100,234$",
    icon: '/icons/oracle-pay/crypto/btc.svg'
  },
  {
    date: "March 19, 2025",
    type: "Pending",
    handle: "#321321",
    amount: "0,0244 TON",
    usdValue: "≈ 100,234$",
    icon: '/icons/oracle-pay/crypto/btc.svg'
  },
  {
    date: "March 19, 2025",
    type: "Success",
    handle: "#321321",
    amount: "0,0244 TON",
    usdValue: "≈ 100,234$",
    icon: '/icons/oracle-pay/crypto/btc.svg'
  },
  // Extended data
  {
    date: "March 21, 2025",
    type: "Deal With",
    handle: "@AnotherUser",
    amount: "0,0300 TON",
    usdValue: "≈ 120,500$",
    icon: '/icons/oracle-pay/crypto/btc.svg'
  },
  {
    date: "March 21, 2025",
    type: "Pending",
    handle: "#654321",
    amount: "0,0300 TON",
    usdValue: "≈ 120,500$",
    icon: '/icons/oracle-pay/crypto/btc.svg'
  },
  {
    date: "March 22, 2025",
    type: "Success",
    handle: "#654321",
    amount: "0,0300 TON",
    usdValue: "≈ 120,500$",
    icon: '/icons/oracle-pay/crypto/btc.svg'
  },
  {
    date: "March 23, 2025",
    type: "Deal With",
    handle: "@NewTrader",
    amount: "0,0150 TON",
    usdValue: "≈ 80,000$",
    icon: '/icons/oracle-pay/crypto/btc.svg'
  },
];
