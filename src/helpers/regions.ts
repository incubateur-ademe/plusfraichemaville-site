type Region = {
  label: string;
  code: string;
};
export const ALL_REGIONS: Region[] = [
  { code: "FR-ARA", label: "Auvergne-Rhône-Alpes" },
  { code: "FR-BFC", label: "Bourgogne-Franche-Comté" },
  { code: "FR-BRE", label: "Bretagne" },
  { code: "FR-CVL", label: "Centre-Val de Loire" },
  { code: "FR-COR", label: "Corse" },
  { code: "FR-GES", label: "Grand Est" },
  { code: "FR-HDF", label: "Hauts-de-France" },
  { code: "FR-IDF", label: "Île-de-France" },
  { code: "FR-NOR", label: "Normandie" },
  { code: "FR-NAQ", label: "Nouvelle-Aquitaine" },
  { code: "FR-OCC", label: "Occitanie" },
  { code: "FR-PDL", label: "Pays de la Loire" },
  { code: "FR-PAC", label: "Provence-Alpes-Côte d'Azur" },
  { code: "FR-GUA", label: "Guadeloupe" },
  { code: "FR-GUF", label: "Guyane" },
  { code: "FR-MTQ", label: "Martinique" },
  { code: "FR-LRE", label: "La Réunion" },
  { code: "FR-MAY", label: "Mayotte" },
];

export const getRegionLabelFromCode = (regionCode?: string | null) =>
  regionCode ? ALL_REGIONS.find((r) => r.code === regionCode)?.label : regionCode;
