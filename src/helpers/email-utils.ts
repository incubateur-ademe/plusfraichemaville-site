// Utility function to validate emails for path usage
export function isValidEmailForPath(email: string): boolean {
  // Basic RFC5322 email regex (or use a robust validator if available)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Disallow characters that could break path or inject data
  const forbiddenChars = /[/\\?#]/;
  return emailRegex.test(email) && !forbiddenChars.test(email);
}
