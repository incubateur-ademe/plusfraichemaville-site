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

const addLeadingZero = (value: number): string => ("0" + value).slice(-2);
