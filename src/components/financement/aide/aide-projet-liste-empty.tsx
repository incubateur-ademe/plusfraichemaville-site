"use client";

import { PFMV_ROUTES } from "@/src/helpers/routes";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { getProjetFichesIdsByType } from "@/src/components/common/generic-save-fiche/helpers";
import { TypeFiche } from "@/src/helpers/common";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import { isEmpty } from "@/src/helpers/listUtils";

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

export const AideProjetListeEmpty = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const fichesSolutions = getProjetFichesIdsByType({ projet, typeFiche: TypeFiche.solution });

  const hasFichesSolutions = !isEmpty(fichesSolutions);

  const data = datas[hasFichesSolutions ? "estimation" : "solution"];

  return (
    <div>
      <p className="text-lg">{data.description}</p>
      <LinkWithoutPrefetch href={data.url(projet?.id ?? 0)} className="fr-btn mb-7 rounded-3xl">
        {data.label}
      </LinkWithoutPrefetch>
    </div>
  );
};
