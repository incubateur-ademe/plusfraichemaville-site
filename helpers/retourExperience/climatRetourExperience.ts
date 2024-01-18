type ClimatRetourExperience = {
  code: string;
  label: string;
};

const CLIMAT_MEDITERRANEEN: ClimatRetourExperience = {
  code: "mediterraneen",
  label: "Méditerranéen",
};
const CLIMAT_OCEANIQUE: ClimatRetourExperience = {
  code: "oceanique",
  label: "Océanique",
};
const CLIMAT_SEMI_ARIDE: ClimatRetourExperience = {
  code: "semi_aride",
  label: "Semi-aride",
};
const CLIMAT_SEMI_CONTINENTAL: ClimatRetourExperience = {
  code: "semi_continental",
  label: "Semi-continental",
};
const CLIMAT_EQUATORIAL: ClimatRetourExperience = {
  code: "equatorial",
  label: "Équatorial",
};

const CLIMATS_RETOUR_EXPERIENCE = [
  CLIMAT_MEDITERRANEEN,
  CLIMAT_OCEANIQUE,
  CLIMAT_SEMI_ARIDE,
  CLIMAT_SEMI_CONTINENTAL,
  CLIMAT_EQUATORIAL,
];

export const getClimatLabelFromCode = (climatCode?: string | undefined) =>
  CLIMATS_RETOUR_EXPERIENCE.find((climat) => climat.code === climatCode)?.label || climatCode;
