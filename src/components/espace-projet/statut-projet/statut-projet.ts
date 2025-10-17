import { StatutProjet } from "@/src/generated/prisma/client";

type STATUT_PROJET_BUTTON = {
  label: string;
  icon: string;
  statut: StatutProjet;
};

export const STATUT_PROJET_BUTTONS: STATUT_PROJET_BUTTON[] = [
  {
    label: "J’ai terminé mon projet",
    icon: "/images/espace-projet/statut/statut-projet-termine.svg",
    statut: StatutProjet.termine,
  },
  {
    label: "Je n’ai pas fini",
    icon: "/images/espace-projet/statut/statut-projet-en-cours.svg",
    statut: StatutProjet.en_cours,
  },
  {
    label: "J’ai besoin d’aide",
    icon: "/images/espace-projet/statut/statut-projet-besoin-aide.svg",
    statut: StatutProjet.besoin_aide,
  },
];
