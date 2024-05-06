type UniteCout = {
  code: string;
  unitLabel: string;
  estimationLabel: string;
};

const UNITE_COUT_LINEAIRE: UniteCout = {
  code: "lineaire",
  unitLabel: "mètre linéaire",
  estimationLabel: "Nombre de mètre linéaire",
};
const UNITE_COUT_METRE_CARRE: UniteCout = {
  code: "metreCarre",
  unitLabel: "m²",
  estimationLabel: "Nombre de m²",
};
const UNITE_COUT_METRE_CUBE: UniteCout = {
  code: "metreCube",
  unitLabel: "m³",
  estimationLabel: "Nombre de m³",
};
const UNITE_COUT_UNITE: UniteCout = {
  code: "unite",
  unitLabel: "unité",
  estimationLabel: "Nombre d'unité",
};
export const UNITE_COUT_MEGAWATTHEURE: UniteCout = {
  code: "megaWattHeure",
  unitLabel: "MWh",
  estimationLabel: "Nombre de MWh",
};

const ALL_UNITES_COUT: UniteCout[] = [
  UNITE_COUT_LINEAIRE,
  UNITE_COUT_METRE_CARRE,
  UNITE_COUT_METRE_CUBE,
  UNITE_COUT_UNITE,
  UNITE_COUT_MEGAWATTHEURE,
];

export const getUniteCoutFromCode = (code?: string) =>
  ALL_UNITES_COUT.find((cout) => cout.code === code) || UNITE_COUT_METRE_CARRE;
