"use client";

import { PFMV_ROUTES } from "@/helpers/routes";
import { useProjetsStore } from "@/stores/projets/provider";
import Link from "next/link";

const datas = {
  solution: {
    description:
      // eslint-disable-next-line max-len
      "Je n’ai pas encore sélectionné de solutions. Pour trouver des aides, sélectionnez d’abord des solutions de rafraîchissement adaptées à mon projet.",
    label: "Je choisis mes solutions",
    url: (projetId: number) => PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS_LISTE(projetId),
  },
  estimation: {
    description:
      "Vous n’avez pas encore fait d’estimation. Pour trouver des aides, veuillez d’abord faire une estimation.",
    label: "Je fais une estimation",
    url: (projetId: number) => PFMV_ROUTES.ESPACE_PROJET_CREATION_ESTIMATION(projetId),
  },
};

export const AideEstimationListeEmpty = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());

  const { fiches_solutions_id: fichesSolutions } = projet || {};
  const hasFichesSolutions = fichesSolutions && fichesSolutions?.length > 0;

  const data = datas[hasFichesSolutions ? "estimation" : "solution"];

  return (
    <div>
      <p className="text-lg">{data.description}</p>
      <Link href={data.url(projet?.id ?? 0)} className="fr-btn mb-7 rounded-3xl">
        {data.label}
      </Link>
    </div>
  );
};
