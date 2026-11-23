import { getRegionLabelFromCode } from "@/src/helpers/regions";

/**
 * Correspondance code département (INSEE / COG) → code région (ISO 3166-2, cf. ALL_REGIONS).
 * Les collectivités d'outre-mer (975, 977, 978, 986, 987, 988) ne sont rattachées à aucune région :
 * elles sont volontairement absentes de cette table.
 */
const DEPARTEMENT_TO_REGION_CODE: Record<string, string> = {
  // Auvergne-Rhône-Alpes
  "01": "FR-ARA",
  "03": "FR-ARA",
  "07": "FR-ARA",
  "15": "FR-ARA",
  "26": "FR-ARA",
  "38": "FR-ARA",
  "42": "FR-ARA",
  "43": "FR-ARA",
  "63": "FR-ARA",
  "69": "FR-ARA",
  "73": "FR-ARA",
  "74": "FR-ARA",
  // Bourgogne-Franche-Comté
  "21": "FR-BFC",
  "25": "FR-BFC",
  "39": "FR-BFC",
  "58": "FR-BFC",
  "70": "FR-BFC",
  "71": "FR-BFC",
  "89": "FR-BFC",
  "90": "FR-BFC",
  // Bretagne
  "22": "FR-BRE",
  "29": "FR-BRE",
  "35": "FR-BRE",
  "56": "FR-BRE",
  // Centre-Val de Loire
  "18": "FR-CVL",
  "28": "FR-CVL",
  "36": "FR-CVL",
  "37": "FR-CVL",
  "41": "FR-CVL",
  "45": "FR-CVL",
  // Corse
  "2A": "FR-COR",
  "2B": "FR-COR",
  // Grand Est
  "08": "FR-GES",
  "10": "FR-GES",
  "51": "FR-GES",
  "52": "FR-GES",
  "54": "FR-GES",
  "55": "FR-GES",
  "57": "FR-GES",
  "67": "FR-GES",
  "68": "FR-GES",
  "88": "FR-GES",
  // Hauts-de-France
  "02": "FR-HDF",
  "59": "FR-HDF",
  "60": "FR-HDF",
  "62": "FR-HDF",
  "80": "FR-HDF",
  // Île-de-France
  "75": "FR-IDF",
  "77": "FR-IDF",
  "78": "FR-IDF",
  "91": "FR-IDF",
  "92": "FR-IDF",
  "93": "FR-IDF",
  "94": "FR-IDF",
  "95": "FR-IDF",
  // Normandie
  "14": "FR-NOR",
  "27": "FR-NOR",
  "50": "FR-NOR",
  "61": "FR-NOR",
  "76": "FR-NOR",
  // Nouvelle-Aquitaine
  "16": "FR-NAQ",
  "17": "FR-NAQ",
  "19": "FR-NAQ",
  "23": "FR-NAQ",
  "24": "FR-NAQ",
  "33": "FR-NAQ",
  "40": "FR-NAQ",
  "47": "FR-NAQ",
  "64": "FR-NAQ",
  "79": "FR-NAQ",
  "86": "FR-NAQ",
  "87": "FR-NAQ",
  // Occitanie
  "09": "FR-OCC",
  "11": "FR-OCC",
  "12": "FR-OCC",
  "30": "FR-OCC",
  "31": "FR-OCC",
  "32": "FR-OCC",
  "34": "FR-OCC",
  "46": "FR-OCC",
  "48": "FR-OCC",
  "65": "FR-OCC",
  "66": "FR-OCC",
  "81": "FR-OCC",
  "82": "FR-OCC",
  // Pays de la Loire
  "44": "FR-PDL",
  "49": "FR-PDL",
  "53": "FR-PDL",
  "72": "FR-PDL",
  "85": "FR-PDL",
  // Provence-Alpes-Côte d'Azur
  "04": "FR-PAC",
  "05": "FR-PAC",
  "06": "FR-PAC",
  "13": "FR-PAC",
  "83": "FR-PAC",
  "84": "FR-PAC",
  // DROM (département et région à la fois)
  "971": "FR-GUA",
  "972": "FR-MTQ",
  "973": "FR-GUF",
  "974": "FR-LRE",
  "976": "FR-MAY",
};

const normalizeDepartementCode = (departementCode: string) => {
  const code = departementCode.trim().toUpperCase();
  // Tolère un code numérique saisi sans zéro initial (ex. "1" → "01")
  return /^\d$/.test(code) ? code.padStart(2, "0") : code;
};

export const getRegionCodeFromDepartementCode = (departementCode?: string | null): string | null =>
  departementCode ? DEPARTEMENT_TO_REGION_CODE[normalizeDepartementCode(departementCode)] ?? null : null;

export const getRegionLabelFromDepartementCode = (departementCode?: string | null): string | null =>
  getRegionLabelFromCode(getRegionCodeFromDepartementCode(departementCode)) ?? null;
