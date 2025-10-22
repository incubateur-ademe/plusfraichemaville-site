import { StatutProjet } from "@/src/generated/prisma/client";
import { FrIconClassName, RiIconClassName } from "@codegouvfr/react-dsfr";

type STATUT_PROJET_TYPE = {
  statut: StatutProjet;
  buttonLabel: string;
  buttonIcon: string;
  progressLabel: string;
  progressIconId: FrIconClassName | RiIconClassName;
};

const STATUT_PROJET_TERMINE: STATUT_PROJET_TYPE = {
  statut: StatutProjet.termine,
  buttonLabel: "J’ai terminé mon projet",
  buttonIcon: "/images/espace-projet/statut/statut-projet-termine.svg",
  progressLabel: "Projet complété",
  progressIconId: "fr-icon-success-fill",
};

const STATUT_PROJET_EN_COURS: STATUT_PROJET_TYPE = {
  statut: StatutProjet.en_cours,
  buttonLabel: "Je n’ai pas fini",
  buttonIcon: "/images/espace-projet/statut/statut-projet-en-cours.svg",
  progressLabel: "Projet en cours",
  progressIconId: "fr-icon-play-circle-fill",
};

const STATUT_PROJET_BESOIN_AIDE: STATUT_PROJET_TYPE = {
  statut: StatutProjet.besoin_aide,
  buttonLabel: "J’ai besoin d’aide",
  buttonIcon: "/images/espace-projet/statut/statut-projet-besoin-aide.svg",
  progressLabel: "Projet en cours",
  progressIconId: "fr-icon-play-circle-fill",
};

export const ALL_STATUT_PROJET: STATUT_PROJET_TYPE[] = [
  STATUT_PROJET_TERMINE,
  STATUT_PROJET_EN_COURS,
  STATUT_PROJET_BESOIN_AIDE,
];

export const getStatutProjetByStatut = (projetStatut: StatutProjet | null) =>
  ALL_STATUT_PROJET.find((statut) => statut.statut === projetStatut) || STATUT_PROJET_EN_COURS;
