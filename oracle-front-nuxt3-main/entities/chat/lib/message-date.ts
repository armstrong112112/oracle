const MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const MONTH_DAY = /^([A-Za-z]+)\s+(\d{1,2})(?:,\s*(\d{4}))?$/;

export const localizedMessageDate = (
  value: string | undefined,
  locale: string,
  today: string,
  yesterday: string,
): string => {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) {
    return "";
  }
  const lower = trimmed.toLowerCase();
  if (lower === "today") {
    return today;
  }
  if (lower === "yesterday") {
    return yesterday;
  }
  const match = MONTH_DAY.exec(trimmed);
  if (!match) {
    return trimmed;
  }
  const month = MONTHS.indexOf(match[1].toLowerCase());
  if (month < 0) {
    return trimmed;
  }
  const date = new Date(Number(match[3] ?? 2026), month, Number(match[2]));
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    ...(match[3] ? { year: "numeric" as const } : {}),
  }).format(date);
};
