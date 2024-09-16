type PorteeBaisseTemperatureFicheSolution = {
  code: string;
  label: string;
};

const PORTEE_AIR: PorteeBaisseTemperatureFicheSolution = {
  code: "air",
  label: "Baisse médiane de la température de l’air",
};

const PORTEE_SURFACE: PorteeBaisseTemperatureFicheSolution = {
  code: "surface",
  label: "Baisse médiane de la température de surface",
};

const PORTEE_INTERIEUR: PorteeBaisseTemperatureFicheSolution = {
  code: "interieur",
  label: "Baisse médiane de la température intérieure",
};

export const ALL_PORTEES_BAISSE_TEMPERATURE_FICHE_SOLUTION: PorteeBaisseTemperatureFicheSolution[] = [
  PORTEE_AIR,
  PORTEE_SURFACE,
  PORTEE_INTERIEUR,
];

export const getPorteeBaisseTemperatureLabelFromCode = (porteeCode?: string) =>
  ALL_PORTEES_BAISSE_TEMPERATURE_FICHE_SOLUTION.find((portee) => porteeCode === portee.code)?.label || PORTEE_AIR.label;
