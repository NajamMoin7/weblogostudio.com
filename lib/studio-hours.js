/**
 * Studio hours for the 2-hour concept promise: Monday to Friday, 9am to 6pm Eastern.
 * Pure functions, used by the live studio clock on the client.
 */
const fmt = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  weekday: "short",
  hour: "numeric",
  minute: "2-digit",
  hour12: false,
});
const timeFmt = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  hour: "numeric",
  minute: "2-digit",
});

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function studioStatus(date = new Date()) {
  const parts = Object.fromEntries(fmt.formatToParts(date).map((p) => [p.type, p.value]));
  const day = DAYS.indexOf(parts.weekday);
  const hour = Number(parts.hour) % 24;
  const minutes = hour * 60 + Number(parts.minute);
  const weekday = day >= 1 && day <= 5;
  const open = weekday && minutes >= 9 * 60 && minutes < 18 * 60;

  let opensLabel = null;
  if (!open) {
    if (weekday && minutes < 9 * 60) opensLabel = "today 9:00 AM";
    else if (day >= 1 && day <= 4) opensLabel = "tomorrow 9:00 AM";
    else opensLabel = "Monday 9:00 AM";
  }
  return { open, time: timeFmt.format(date), opensLabel };
}
