declare module "@prisma/sql" {
  export function northStartStatQuery(dateFrom: Date, range: string): string;
}
