type ClimatRetourExperience = {
  code: string;
  label: string;
};

export const CLIMAT_MEDITERRANEEN: ClimatRetourExperience = {
  code: "mediterraneen",
  label: "Méditerranéen",
};
export const CLIMAT_OCEANIQUE: ClimatRetourExperience = {
  code: "oceanique",
  label: "Océanique",
};
export const CLIMAT_SEMI_ARIDE: ClimatRetourExperience = {
  code: "semi_aride",
  label: "Semi-aride",
};
export const CLIMAT_SEMI_CONTINENTAL: ClimatRetourExperience = {
  code: "semi_continental",
  label: "Semi-continental",
};
export const CLIMAT_EQUATORIAL: ClimatRetourExperience = {
  code: "equatorial",
  label: "Équatorial",
};

export const CLIMAT_TEMPERE: ClimatRetourExperience = {
  code: "tempere",
  label: "Tempéré",
};

const CLIMATS_RETOUR_EXPERIENCE = [
  CLIMAT_MEDITERRANEEN,
  CLIMAT_OCEANIQUE,
  CLIMAT_SEMI_ARIDE,
  CLIMAT_SEMI_CONTINENTAL,
  CLIMAT_EQUATORIAL,
  CLIMAT_TEMPERE
];

export const getClimatLabelFromCode = (climatCode?: string | undefined) =>
  CLIMATS_RETOUR_EXPERIENCE.find((climat) => climat.code === climatCode)?.label || climatCode;
