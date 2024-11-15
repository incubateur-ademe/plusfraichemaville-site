import { SelectOption } from "@/src/components/common/SelectFormField";

export type ObjetMessageContact = {
  label: string;
};

const ALL_OBJET_MESSAGE_CONTACT: ObjetMessageContact[] = [
  {
    label: "Réserver une démonstration de la plateforme",
  },
  {
    label: "Etablir un partenariat",
  },
  {
    label: "Partager les retours d’un projet de rafraîchissement",
  },
  {
    label: "Faire une suggestion sur le site",
  },
  {
    label: "Signaler un problème sur le site",
  },
  {
    label: "Autres",
  },
];

export const objetMessageContactOptions = (): SelectOption[] => [
  ...ALL_OBJET_MESSAGE_CONTACT.map((canal) => ({ name: canal.label, value: canal.label })),
];
