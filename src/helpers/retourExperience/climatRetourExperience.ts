import { ClimatActuel } from "@/src/lib/strapi/types/api/retour-experience";

type ClimatRetourExperience = {
  code: string;
  label: string;
};

export const CLIMAT_MEDITERRANEEN: ClimatRetourExperience = {
  code: ClimatActuel.Mediterraneen,
  label: "Méditerranéen",
};
export const CLIMAT_OCEANIQUE: ClimatRetourExperience = {
  code: ClimatActuel.Oceanique,
  label: "Océanique",
};
export const CLIMAT_SEMI_ARIDE: ClimatRetourExperience = {
  code: ClimatActuel.SemiAride,
  label: "Semi-aride",
};
export const CLIMAT_SEMI_CONTINENTAL: ClimatRetourExperience = {
  code: ClimatActuel.SemiContinental,
  label: "Semi-continental",
};
export const CLIMAT_EQUATORIAL: ClimatRetourExperience = {
  code: ClimatActuel.Equatorial,
  label: "Équatorial",
};

export const CLIMAT_TEMPERE: ClimatRetourExperience = {
  code: ClimatActuel.Tempere,
  label: "Tempéré",
};

export const CLIMAT_TROPICAL: ClimatRetourExperience = {
  code: ClimatActuel.Tropical,
  label: "Tropical",
};

const CLIMATS_RETOUR_EXPERIENCE = [
  CLIMAT_MEDITERRANEEN,
  CLIMAT_OCEANIQUE,
  CLIMAT_SEMI_ARIDE,
  CLIMAT_SEMI_CONTINENTAL,
  CLIMAT_EQUATORIAL,
  CLIMAT_TEMPERE,
  CLIMAT_TROPICAL,
];

export const getClimatLabelFromCode = (climatCode?: string | undefined) =>
  CLIMATS_RETOUR_EXPERIENCE.find((climat) => climat.code === climatCode)?.label || climatCode;
