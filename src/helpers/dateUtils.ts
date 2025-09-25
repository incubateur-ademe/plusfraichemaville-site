export type DateRange = "day" | "week" | "month" | "year";

export const FAR_FUTURE = new Date(3024, 0, 0, 1);

export const removeDaysToDate = (date: Date, nbDays: number) => new Date(date.getTime() - nbDays * 24 * 60 * 60 * 1000);

export function monthDateToString(value: Date | null | undefined): string {
  return value ? `${value.getFullYear()}-${("0" + (value.getMonth() + 1)).slice(-2)}` : "";
}

export function dateToStringWithTime(value: Date): string {
  return `${dateToStringWithoutTime(value)} à ${addLeadingZero(value.getHours())}:${addLeadingZero(
    value.getMinutes(),
  )}`;
}

export function dateToStringWithoutTime(value: Date | null | undefined, format: "fr" | "iso" = "fr"): string | null {
  if (value == null) {
    return null;
  }

  if (format === "iso") {
    return `${value.getFullYear()}-${addLeadingZero(value.getMonth() + 1)}-${addLeadingZero(value.getDate())}`;
  }

  return `${addLeadingZero(value.getDate())}/${addLeadingZero(value.getMonth() + 1)}/${value.getFullYear()}`;
}

export function dateToLiteralString(value?: Date): string | null {
  if (!value) {
    return null;
  }
  return value.toLocaleString("fr", {
    month: "long",
    day: "numeric",
    weekday: "long",
    year: "numeric",
  });
}

export function stipStrapiTime(time: Date): string {
  return time.toString().substring(0, 5);
}

export const getRelativeDate = (lastUpdate?: number | null) =>
  !lastUpdate ? "Aujourd'hui" : lastUpdate === 1 ? "Hier" : `Il y a ${lastUpdate} jours`;

const addLeadingZero = (value: number): string => ("0" + value).slice(-2);

export const daysUntilDate = (targetDate: Date | null): number | null => {
  if (!targetDate) {
    return null;
  }
  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  return Math.ceil((targetDate.getTime() - new Date().getTime()) / MS_PER_DAY);
};

export const dateSort = (a: Date | string | null, b: Date | string | null) =>
  new Date(a || FAR_FUTURE) < new Date(b || FAR_FUTURE) ? -1 : 0;
