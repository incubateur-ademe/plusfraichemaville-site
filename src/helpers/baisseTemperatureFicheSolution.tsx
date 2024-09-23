type BaisseTemperatureFicheSolution = {
  code: string;
  threshold: number;
  label: string;
};

const BAISSE_LOW: BaisseTemperatureFicheSolution = {
  code: "faible",
  threshold: 1,
  label: "Faible (< 1°C)",
};

const BAISSE_MEDIUM: BaisseTemperatureFicheSolution = {
  code: "moyen",
  threshold: 3,
  label: "Moyenne (Entre 1 et 3°C)",
};

const BAISSE_HIGH: BaisseTemperatureFicheSolution = {
  code: "fort",
  threshold: Number.MAX_SAFE_INTEGER,
  label: "Forte (>= 3°C)",
};

export const ALL_BAISSES_TEMPERATURE_FICHE_SOLUTION: BaisseTemperatureFicheSolution[] = [
  BAISSE_LOW,
  BAISSE_MEDIUM,
  BAISSE_HIGH,
];

export const getBaisseTemperatureFicheSolutionFromTemperature = (baisseTemperature: number) =>
  ALL_BAISSES_TEMPERATURE_FICHE_SOLUTION.find((bt) => baisseTemperature < bt.threshold) || BAISSE_LOW;
