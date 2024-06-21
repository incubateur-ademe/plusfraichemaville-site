"use client";

import { useProjetsStore } from "@/stores/projets/provider";
import { AideEstimationsCard } from "./aide-estimations-card";
import { AideEstimationsCardWithoutSelection } from "./aide-estimations-card-without-selection";
import { AideEstimationsCardWithSelection } from "./aide-estimations-card-with-selection";
import { AideEstimationsListeHeader } from "./aide-estimations-liste-header";
import Link from "next/link";
import { PFMV_ROUTES } from "@/helpers/routes";

export const AideEstimationsListe = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const { estimations, fiches_solutions_id: fichesSolutions } = projet || {};

  const hasEstimations = estimations && estimations?.length > 0;
  const hasFichesSolutions = fichesSolutions && fichesSolutions?.length > 0;

  if (!hasEstimations || !hasFichesSolutions) {
    return null;
  }

  return (
    <div>
      <AideEstimationsListeHeader
        projetId={projet?.id}
        title="Pour quelle estimation souhaitez-vous trouver des financements ou des soutiens à l'ingénierie ?"
      />
      <div>
        {estimations.map((estimation, index) => (
          <AideEstimationsCard estimation={estimation} key={index}>
            {estimation.estimations_aides.length > 0 ? (
              <AideEstimationsCardWithSelection estimationsAides={estimation.estimations_aides}>
                <Link
                  className="fr-btn !ml-auto mt-6 !block rounded-3xl"
                  href={PFMV_ROUTES.ESPACE_PROJET_FINANCEMENT_ESTIMATION_EDIT(projet?.id, estimation.id)}
                >
                  Modifier
                </Link>
              </AideEstimationsCardWithSelection>
            ) : (
              <AideEstimationsCardWithoutSelection estimation={estimation}>
                <Link
                  className="fr-btn !ml-auto !block rounded-3xl"
                  href={PFMV_ROUTES.ESPACE_PROJET_FINANCEMENT_ESTIMATION_EDIT(projet?.id, estimation.id)}
                >
                  Sélectionner
                </Link>
              </AideEstimationsCardWithoutSelection>
            )}
          </AideEstimationsCard>
        ))}
      </div>
    </div>
  );
};
