export function monthDateToString(value: Date | null | undefined): string {
  return value ? `${value.getFullYear()}-${('0' + (value.getMonth() + 1)).slice(-2)}` : "";
}
