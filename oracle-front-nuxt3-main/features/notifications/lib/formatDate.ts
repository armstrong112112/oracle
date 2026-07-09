export function formatNotificationDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    weekday: "long",
  };
  const formatted = date.toLocaleDateString("en-GB", options);
  const [day, month, weekday] = formatted.split(" ");
  return `${day} ${month}, ${weekday}`;
}
