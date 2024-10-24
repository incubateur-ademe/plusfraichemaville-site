import type { Attribute } from "@strapi/strapi";

export const FAR_FUTURE = new Date(3024, 0, 0, 1);

export function monthDateToString(value: Date | null | undefined): string {
  return value ? `${value.getFullYear()}-${("0" + (value.getMonth() + 1)).slice(-2)}` : "";
}

export function dateToStringWithTime(value: Date): string {
  return `${dateToStringWithoutTime(value)} à ${addLeadingZero(value.getHours())}:${addLeadingZero(
    value.getMinutes(),
  )}`;
}

export function dateToStringWithoutTime(value: Date): string | null {
  if (!value) {
    return null;
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

export function stipStrapiTime(time: Attribute.TimeValue): string {
  return time.toString().substring(0, 5);
}

export const getRelativeDate = (lastUpdate?: number | null) =>
  !lastUpdate ? "Aujourd'hui" : lastUpdate === 1 ? "Hier" : `Il y a ${lastUpdate} jours`;

const addLeadingZero = (value: number): string => ("0" + value).slice(-2);
