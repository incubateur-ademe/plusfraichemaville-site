import { StatutUser } from "@/src/generated/prisma/client";

type STATUT_USER_BUTTON = {
  label: string;
  icon: string;
  statut: StatutUser;
};

export const STATUT_USER_BUTTONS: STATUT_USER_BUTTON[] = [
  {
    label: "Je n’ai pas trouvé ce que je voulais",
    icon: "/images/espace-projet/statut/statut-user-pas-trouve.svg",
    statut: StatutUser.pas_trouve,
  },
  {
    label: "Mon projet n’est pas pour tout de suite",
    icon: "/images/espace-projet/statut/statut-user-pas-maintenant.svg",
    statut: StatutUser.pas_maintenant,
  },
  {
    label: "Je n’ai pas compris le fonctionnement",
    icon: "/images/espace-projet/statut/statut-user-pas-compris.svg",
    statut: StatutUser.pas_compris,
  },
  {
    label: "J’ai fait sans Plus fraîche ma ville",
    icon: "/images/espace-projet/statut/statut-user-sans-pfmv.svg",
    statut: StatutUser.sans_pfmv,
  },
  {
    label: "Autre",
    icon: "/images/espace-projet/statut/statut-projet-autre.svg",
    statut: StatutUser.autre,
  },
];
