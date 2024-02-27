export const validateRegistrationNumber = (registrationNumber: string): boolean => {
  if (registrationNumber.length !== 14) {
    return false;
  }
  let sum = 0;
  let digit: number;
  for (let i = 0; i < registrationNumber.length; i++) {
    if (i % 2 === 0) {
      digit = parseInt(registrationNumber.charAt(i), 10) * 2;
      digit = digit > 9 ? (digit -= 9) : digit;
    } else {
      digit = parseInt(registrationNumber.charAt(i), 10);
    }
    sum += digit;
  }
  return sum % 10 === 0;
};
