import type { CheckItem } from "~/entities/checks/model/checks.types";

export const MOCK_CHECKS: CheckItem[] = [
  {
    amount: "15 LTC",
    usdValue: "$12 489",
    remaining: "5 of 10",
    perActivation: "1 LTC",
    rate: "$900",
    status: "Unclaimed",
    createdOn: "Dec 12, 2024",
  },
  {
    amount: "11 LTC",
    usdValue: "$10 365",
    remaining: "10 of 10",
    perActivation: "1 LTC",
    rate: "$900",
    status: "Claimed",
    createdOn: "Dec 10, 2024",
  },
  {
    amount: "8 LTC",
    usdValue: "$7 225",
    remaining: "5 of 10",
    perActivation: "1 LTC",
    rate: "$900",
    status: "Unclaimed",
    createdOn: "Dec 09, 2024",
  },
  {
    amount: "10 LTC",
    usdValue: "$9 200",
    remaining: "5 of 10",
    perActivation: "1 LTC",
    rate: "$900",
    status: "Unclaimed",
    createdOn: "Dec 15, 2024",
  },
];

export interface ChecksListContract {
  checks: CheckItem[];
  total: number;
  page: number;
  pageSize: number;
}

export interface CreateCheckResponseContract {
  success: true;
  check: CheckItem;
}

export const createMockCheck = (input: Partial<CheckItem> = {}): CheckItem => ({
  amount: input.amount ?? "0 LTC",
  usdValue: input.usdValue ?? "$0",
  remaining: input.remaining ?? "0 of 0",
  perActivation: input.perActivation ?? "0 LTC",
  rate: input.rate ?? "$0",
  status: input.status ?? "Unclaimed",
  createdOn: input.createdOn ?? new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }),
});

export const createChecksResponse = (
  page: number = 1,
  pageSize: number = 20,
): ChecksListContract => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    checks: MOCK_CHECKS.slice(start, end),
    total: MOCK_CHECKS.length,
    page,
    pageSize,
  };
};

