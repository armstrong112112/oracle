/**
 * Helper functions for date formatting and other utilities
 */

const normalizeLocale = (locale?: string | null) => {
  if (!locale) return "en-US";

  if (locale === "en") return "en-US";
  if (locale === "ru") return "ru-RU";

  return locale;
};

/**
 * Format a date to a full formatted string
 * @param date - Date object to format
 * @returns Formatted date string
 * @param locale - Locale identifier used for date formatting (for example: en-US or ru-RU)
 */
export function formattedDate(
  date: Date | string,
  locale: string = "en-US"
): string {
  if (!date) return "";

  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "";

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return d.toLocaleDateString(normalizeLocale(locale), options);
}

/**
 * Format a date to a short formatted string
 * @param date - Date object to format
 * @returns Short formatted date string
 * @param locale - Locale identifier used for date formatting (for example: en-US or ru-RU)
 */
export function shortFormattedDate(
  date: Date | string,
  locale: string = "en-US"
): string {
  if (!date) return "";

  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "";

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return d.toLocaleDateString(normalizeLocale(locale), options);
}
