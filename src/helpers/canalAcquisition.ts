import { SelectOption } from "@/src/components/common/SelectFormField";

export type CanalAcquisition = {
  label: string;
};

export const CUSTOM_CANAL_ACQUISITION: CanalAcquisition = {
  label: "Autres...",
};

const ALL_CANAL_ACQUISITION: CanalAcquisition[] = [
  {
    label: "Webinaire",
  },
  {
    label: "Démo Plus fraîche ma ville",
  },
  {
    label: "Mail",
  },
  {
    label: "Appel d’un chargé de déploiement",
  },
  {
    label: "Salon, événement local",
  },
  {
    label: "Recherche internet",
  },
];

export const canalAcquisitionUserOptions = (): SelectOption[] => {
  const allOptions = [...ALL_CANAL_ACQUISITION.map((canal) => ({ name: canal.label, value: canal.label }))];
  allOptions.push({ name: CUSTOM_CANAL_ACQUISITION.label, value: CUSTOM_CANAL_ACQUISITION.label });
  return allOptions;
};