import { SelectOption } from "@/src/components/common/SelectFormField";

export type CanalAcquisition = {
  label: string;
};

export const CUSTOM_CANAL_ACQUISITION: CanalAcquisition = {
  label: "Autre",
};

export const ALL_CANAL_ACQUISITION: CanalAcquisition[] = [
  {
    label: "Présentation par l'équipe Plus fraîche ma ville",
  },
  {
    label: "Présentation par un autre intervenant (ADEME, DDT, CEREMA, AMF, Météo France...)",
  },
  {
    label: "Réseaux sociaux (LinkedIn...)",
  },
  {
    label: "Recherche internet",
  },
  {
    label: "Recommandation d'un collègue ou au sein de mon réseau professionnel",
  },
];

export const canalAcquisitionUserOptions = (): SelectOption[] => {
  const allOptions = [...ALL_CANAL_ACQUISITION.map((canal) => ({ name: canal.label, value: canal.label }))];
  allOptions.push({ name: CUSTOM_CANAL_ACQUISITION.label, value: CUSTOM_CANAL_ACQUISITION.label });
  return allOptions;
};
