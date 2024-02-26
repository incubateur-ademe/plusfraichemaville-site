export function monthDateToString(value: Date | null | undefined): string {
  return value ? `${value.getFullYear()}-${value.getMonth() + 1}` : "";
}
