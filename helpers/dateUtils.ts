export function monthDateToString(value: Date | null | undefined): string {
  return value ? `${value.getFullYear()}-${("0" + (value.getMonth() + 1)).slice(-2)}` : "";
}

export function dateToStringWithTime(value: Date): string {
  return `${addLeadingZero(value.getDate())}/${addLeadingZero(value.getMonth() + 1)}/${value.getFullYear()}
   à ${addLeadingZero(value.getHours())}:${addLeadingZero(value.getMinutes())}`;
}

const addLeadingZero = (value: number): string => ("0" + value).slice(-2);
