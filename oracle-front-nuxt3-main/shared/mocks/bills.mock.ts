import type { Bill } from "~/entities/bills/data/BillsData";

export const MOCK_BILLS: Bill[] = [
  {
    id: 1,
    icon: "/icons/oracle-pay/crypto/btc.svg",
    heading: "Heading text for bill",
    amountTON: 0.0244,
    amountUSD: 100.2345,
    dateLabel: "Due Date",
    date: "May 20, 2025",
    type: "active",
  },
  {
    id: 2,
    icon: "/icons/oracle-pay/crypto/btc.svg",
    heading: "Heading text for bill",
    amountTON: 0.0244,
    amountUSD: 100.2345,
    dateLabel: "Paid on",
    date: "May 20, 2025",
    type: "paid",
  },
  {
    id: 3,
    icon: "/icons/oracle-pay/crypto/btc.svg",
    heading: "Heading text for bill",
    amountTON: 0.0244,
    amountUSD: 100.2345,
    dateLabel: "Paid on",
    date: "May 20, 2025",
    type: "paid",
  },
  {
    id: 4,
    icon: "/icons/oracle-pay/crypto/btc.svg",
    heading: "Heading text for bill",
    amountTON: 0.0244,
    amountUSD: 100.2345,
    dateLabel: "Paid on",
    date: "May 20, 2025",
    type: "paid",
  },
  {
    id: 5,
    icon: "/icons/oracle-pay/crypto/btc.svg",
    heading: "Heading text for bill",
    amountTON: 0.0244,
    amountUSD: 100.2345,
    dateLabel: "Due Date",
    date: "May 20, 2025",
    type: "active",
  },
  {
    id: 6,
    icon: "/icons/oracle-pay/crypto/btc.svg",
    heading: "Heading text for bill",
    amountTON: 0.0244,
    amountUSD: 100.2345,
    dateLabel: "Paid on",
    date: "May 20, 2025",
    type: "paid",
  },
  {
    id: 7,
    icon: "/icons/oracle-pay/crypto/btc.svg",
    heading: "Heading text for bill",
    amountTON: 0.0244,
    amountUSD: 100.2345,
    dateLabel: "Paid on",
    date: "May 20, 2025",
    type: "paid",
  },
  {
    id: 8,
    icon: "/icons/oracle-pay/crypto/btc.svg",
    heading: "Heading text for bill",
    amountTON: 0.0244,
    amountUSD: 100.2345,
    dateLabel: "Paid on",
    date: "May 20, 2025",
    type: "paid",
  },
  {
    id: 9,
    icon: "/icons/oracle-pay/crypto/btc.svg",
    heading: "Heading text for bill",
    amountTON: 0.0244,
    amountUSD: 100.2345,
    dateLabel: "Due Date",
    date: "May 20, 2025",
    type: "active",
  },
  {
    id: 10,
    icon: "/icons/oracle-pay/crypto/btc.svg",
    heading: "Heading text for bill",
    amountTON: 0.0244,
    amountUSD: 100.2345,
    dateLabel: "Paid on",
    date: "May 20, 2025",
    type: "paid",
  },
  {
    id: 11,
    icon: "/icons/oracle-pay/crypto/btc.svg",
    heading: "Heading text for bill",
    amountTON: 0.0244,
    amountUSD: 100.2345,
    dateLabel: "Paid on",
    date: "May 20, 2025",
    type: "paid",
  },
  {
    id: 12,
    icon: "/icons/oracle-pay/crypto/btc.svg",
    heading: "Heading text for bill",
    amountTON: 0.0244,
    amountUSD: 100.2345,
    dateLabel: "Paid on",
    date: "May 20, 2025",
    type: "paid",
  },
];

export interface BillsDraftContract {
  bills: Bill[];
  total: number;
  page: number;
  pageSize: number;
}

export const createBillsResponse = (
  page: number = 1,
  pageSize: number = 20
): BillsDraftContract => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    bills: MOCK_BILLS.slice(start, end),
    total: MOCK_BILLS.length,
    page,
    pageSize,
  };
};


