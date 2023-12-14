type UniteCoutMateriau = {
  code: string;
  unitLabel: string;
};

const UNITE_COUT_MATERIAU_LINEAIRE: UniteCoutMateriau = {
  code: "lineaire",
  unitLabel: "mètre linéaire",
};
const UNITE_COUT_MATERIAU_METRE_CARRE: UniteCoutMateriau = {
  code: "metreCarre",
  unitLabel: "m²",
};
const UNITE_COUT_MATERIAU_METRE_CUBE: UniteCoutMateriau = {
  code: "metreCube",
  unitLabel: "m³",
};
const UNITE_COUT_MATERIAU_UNITE: UniteCoutMateriau = {
  code: "unite",
  unitLabel: "unité",
};

export const ALL_UNITES_COUT_MATERIAU: UniteCoutMateriau[] = [
  UNITE_COUT_MATERIAU_LINEAIRE,
  UNITE_COUT_MATERIAU_METRE_CARRE,
  UNITE_COUT_MATERIAU_METRE_CUBE,
  UNITE_COUT_MATERIAU_UNITE,
];

export const getUniteCoutMateriauFromCode = (code: string) =>
  ALL_UNITES_COUT_MATERIAU.find((cout) => cout.code === code);
