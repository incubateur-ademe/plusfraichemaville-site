import { SelectOption } from "@/src/components/common/SelectFormField";

export type CanalAcquisition = {
  label: string;
  hubspotLabel?: string;
};

export const CUSTOM_CANAL_ACQUISITION: CanalAcquisition = {
  label: "Autre",
};

export const ALL_CANAL_ACQUISITION: CanalAcquisition[] = [
  {
    label: "Accompagnement ou appel à manifestation d’intérêt (AMI)",
    hubspotLabel : "Appel à manifestation d'intérêt (AMI)",
  },
  {
    label: "Message de ma hiérarchie ou de collègues",
    hubspotLabel: "Mail",
  },
  {
    label: "Réseau ADEME",
  },
  {
    label: "Salon ou événement local",
    hubspotLabel: "Salon, événement local",
  },
  {
    label: "Médias (presse, radio, TV)",
  },
  {
    label: "Réseaux sociaux (ex. LinkedIn)",
  },
  {
    label: "Appel d'un chargé de déploiement",
  },
  {
    label: "Recherche internet",
  },
  {
    label: "Recommandation / bouche-à-oreille",
  },
];

export const canalAcquisitionUserOptions = (): SelectOption[] => {
  const allOptions = [...ALL_CANAL_ACQUISITION.map((canal) => ({ name: canal.label, value: canal.label }))];
  allOptions.push({ name: CUSTOM_CANAL_ACQUISITION.label, value: CUSTOM_CANAL_ACQUISITION.label });
  return allOptions;
};
