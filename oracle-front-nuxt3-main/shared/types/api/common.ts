export type ExchangeTypeDto = "cryptoToFiat" | "fiatToCrypto";
export type TransactionStatusDto =
  | "pending"
  | "active"
  | "declined"
  | "paymentConfirmed"
  | "receiptConfirmed"
  | "finished"
  | "cancelled"
  | "disputeOpen"
  | "disputeResolved"
  | "systemDowntime";
export type RespondActionDto = "accept" | "decline";
export type RoleDto = "customer" | "exchanger" | "moderator";
export type HistoryTransactionTypeDto =
  | "deposit"
  | "withdrawal"
  | "transfer"
  | "recharge"
  | "payment";
export type HistoryTransactionStatusDto =
  | "pending"
  | "success"
  | "failed"
  | "cancelled"
  | "refunded"
  | "expired"
  | "processing"
  | "rejected"
  | "approved";

export interface CommonSanitizedRecord {
  [key: string]: unknown;
}

export const sanitizeString = (value: unknown, fallback = ""): string =>
  typeof value === "string" ? value : fallback;

export const sanitizeNumber = (value: unknown, fallback = 0): number =>
  typeof value === "number" && Number.isFinite(value) ? value : fallback;

export const sanitizeBoolean = (value: unknown, fallback = false): boolean =>
  typeof value === "boolean" ? value : fallback;

export const sanitizeArray = <T>(value: unknown, fallback: T[] = []): T[] =>
  Array.isArray(value) ? (value as T[]) : fallback;

export const sanitizeRecord = (
  value: unknown,
  fallback: Record<string, unknown> = {},
): Record<string, unknown> =>
  value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : fallback;

export const sanitizeMap = (
  value: unknown,
  fallback: Record<string, unknown> = {},
): Record<string, unknown> => sanitizeRecord(value, fallback);

const exchangeTypeFromNumber = (value: number): ExchangeTypeDto | undefined => {
  if (value === 0) return "cryptoToFiat";
  if (value === 1) return "fiatToCrypto";
  return undefined;
};

export const sanitizeExchangeType = (value: unknown): ExchangeTypeDto => {
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized.includes("crypto") && normalized.includes("fiat")) return "cryptoToFiat";
    if (normalized.includes("fiat") && normalized.includes("crypto")) return "fiatToCrypto";
  }
  if (typeof value === "number") {
    return exchangeTypeFromNumber(value) ?? "cryptoToFiat";
  }
  return "cryptoToFiat";
};

const transactionStatusMap: Record<string, TransactionStatusDto> = {
  pending: "pending",
  active: "active",
  declined: "declined",
  paymentconfirmed: "paymentConfirmed",
  receiptconfirmed: "receiptConfirmed",
  finished: "finished",
  cancelled: "cancelled",
  disputeopen: "disputeOpen",
  disputeresolved: "disputeResolved",
  systemdowntime: "systemDowntime",
};

export const sanitizeTransactionStatus = (value: unknown): TransactionStatusDto => {
  if (typeof value === "number") {
    const numericMap: Record<number, TransactionStatusDto> = {
      0: "pending",
      1: "active",
      2: "declined",
      3: "paymentConfirmed",
      4: "receiptConfirmed",
      5: "finished",
      6: "cancelled",
      7: "disputeOpen",
      8: "disputeResolved",
      9: "systemDowntime",
    };
    return numericMap[value] ?? "pending";
  }
  if (typeof value === "string") {
    const key = value.replace(/[_\s-]/g, "").toLowerCase();
    return transactionStatusMap[key] ?? "pending";
  }
  return "pending";
};

export const sanitizeRespondAction = (value: unknown): RespondActionDto => {
  if (typeof value === "string" && value.toLowerCase().includes("decline")) return "decline";
  return "accept";
};

export const sanitizeRole = (value: unknown): RoleDto => {
  if (typeof value === "number") {
    if (value === 1) return "exchanger";
    if (value === 2) return "moderator";
    return "customer";
  }
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized.includes("moderator")) return "moderator";
    if (normalized.includes("exchanger")) return "exchanger";
  }
  return "customer";
};

export const sanitizeHistoryTransactionType = (
  value: unknown,
): HistoryTransactionTypeDto => {
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized.includes("withdraw")) return "withdrawal";
    if (normalized.includes("deposit")) return "deposit";
    if (normalized.includes("transfer")) return "transfer";
    if (normalized.includes("recharge")) return "recharge";
    if (normalized.includes("payment")) return "payment";
  }
  return "payment";
};

export const sanitizeHistoryTransactionStatus = (
  value: unknown,
): HistoryTransactionStatusDto => {
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized in {
      pending: true,
      success: true,
      failed: true,
      cancelled: true,
      refunded: true,
      expired: true,
      processing: true,
      rejected: true,
      approved: true,
    }) {
      return normalized as HistoryTransactionStatusDto;
    }
  }
  return "pending";
};

export const unwrapApiPayload = (
  value: unknown,
  preferredKeys: string[] = [
    "data",
    "result",
    "response",
    "payload",
    "items",
    "list",
    "records",
    "value",
  ],
): unknown => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return value;
  }

  const record = value as Record<string, unknown>;

  for (const key of preferredKeys) {
    if (key in record && record[key] !== undefined) {
      return record[key];
    }
  }

  return value;
};
