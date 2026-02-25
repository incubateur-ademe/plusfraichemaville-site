/**
 * Collectivités ultramarines françaises par code postal :
 * - 971xx : Guadeloupe (dont Saint-Barthélemy et Saint-Martin)
 * - 972xx : Martinique
 * - 973xx : Guyane
 * - 974xx : La Réunion
 * - 975xx : Saint-Pierre-et-Miquelon
 * - 976xx : Mayotte
 * - 986xx : Wallis-et-Futuna
 * - 987xx  : Polynésie française
 * - 988xx  : Nouvelle-Calédonie
 */
const ULTRAMARINE_POSTAL_PREFIXES = ["97", "986", "987", "988"];

export const isUltramarineCodePostal = (codePostal?: string | null): boolean => {
  if (!codePostal) {
    return false;
  }
  return ULTRAMARINE_POSTAL_PREFIXES.some((prefix) => codePostal.startsWith(prefix));
};
