type TemporaliteRetourExperience = {
  code: string;
  label: string;
};

const TEMPORALITE_SHORT: TemporaliteRetourExperience = {
  code: "court_terme",
  label: "Court terme",
};
const TEMPORALITE_AVERAGE: TemporaliteRetourExperience = {
  code: "moyen_terme",
  label: "Moyen terme",
};

const TEMPORALITE_LONG: TemporaliteRetourExperience = {
  code: "long_terme",
  label: "Long terme",
};

const TEMPORALITES_RETOUR_EXPERIENCE = [TEMPORALITE_SHORT, TEMPORALITE_AVERAGE, TEMPORALITE_LONG];

export const getTemporaliteLabelFromCode = (code?: string | undefined) =>
  TEMPORALITES_RETOUR_EXPERIENCE.find((temporalite) => temporalite.code === code)?.label || code;
