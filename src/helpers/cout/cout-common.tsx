import { CoutUnite } from "@/src/lib/strapi/types/api/materiau";

type UniteCout = {
  code: string;
  unitLabel: string;
  unitLabelPlural: string;
  estimationLabel: string;
};

const UNITE_COUT_LINEAIRE: UniteCout = {
  code: CoutUnite.Lineaire,
  unitLabel: "mètre linéaire",
  unitLabelPlural: "mètres linéaires",
  estimationLabel: "Nombre de mètre linéaire",
};
const UNITE_COUT_METRE_CARRE: UniteCout = {
  code: CoutUnite.MetreCarre,
  unitLabel: "m²",
  unitLabelPlural: "m²",
  estimationLabel: "Nombre de m²",
};
const UNITE_COUT_METRE_CUBE: UniteCout = {
  code: CoutUnite.MetreCube,
  unitLabel: "m³",
  unitLabelPlural: "m³",
  estimationLabel: "Nombre de m³",
};
const UNITE_COUT_UNITE: UniteCout = {
  code: CoutUnite.Unite,
  unitLabel: "unité",
  unitLabelPlural: "unités",
  estimationLabel: "Nombre d'unité",
};
export const UNITE_COUT_MEGAWATTHEURE: UniteCout = {
  code: CoutUnite.MegaWattHeure,
  unitLabel: "MWh",
  unitLabelPlural: "MWh",
  estimationLabel: "Nombre de MWh",
};

const UNITE_COUT_KILOWATT: UniteCout = {
  code: CoutUnite.KiloWatt,
  unitLabel: "kW",
  unitLabelPlural: "kW",
  estimationLabel: "Nombre de kW",
};

const ALL_UNITES_COUT: UniteCout[] = [
  UNITE_COUT_LINEAIRE,
  UNITE_COUT_METRE_CARRE,
  UNITE_COUT_METRE_CUBE,
  UNITE_COUT_UNITE,
  UNITE_COUT_MEGAWATTHEURE,
  UNITE_COUT_KILOWATT,
];

export const getUniteCoutFromCode = (code?: string) =>
  ALL_UNITES_COUT.find((cout) => cout.code === code) || UNITE_COUT_METRE_CARRE;
