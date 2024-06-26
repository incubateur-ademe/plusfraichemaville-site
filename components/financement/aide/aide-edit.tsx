"use client";

import { useProjetsStore } from "@/stores/projets/provider";
import { AideEstimationsListeHeader } from "./aide-estimations-liste-header";
import { AideEstimationsPanelHeader } from "./aide-estimations-panel-header";
import { useParams } from "next/navigation";
import { AideCard } from "./aide-card";
import { AideCardSkeleton } from "./aide-card-skeleton";
import { useAidesByEstimationFetcher } from "@/hooks/use-aides-by-estimation";
import { AideEditFilter } from "./aide-edit-filter";
import { memo, useMemo } from "react";
import { countAidesByType, resolveAidType } from "../helpers";
import { TypeAidesTerritoiresAide } from "@/components/financement/types";
import { useAideEstimationEditFilter } from "@/hooks/use-aide-estimation-edit-filter";

export const AideEdit = memo(() => {
  const projetId = useProjetsStore((state) => state.currentProjetId);
  const estimationId = useParams().estimationId as string;
  const skeletons = [...new Array(4)].map((_, i) => <AideCardSkeleton key={i} />);
  const { filters, toggleFilter } = useAideEstimationEditFilter();

  const { data, isLoading } = useAidesByEstimationFetcher(estimationId);
  const { aideFinanciereCount, aideTechniqueCount } = countAidesByType(data?.results ?? []);
  const filteredResults = useMemo(
    () =>
      data?.results
        .filter(
          (aide) =>
            filters.showAidesIngenierie || resolveAidType(aide.aid_types_full) !== TypeAidesTerritoiresAide.ingenierie,
        )
        .filter(
          (aide) =>
            filters.showAidesFinancieres ||
            resolveAidType(aide.aid_types_full) !== TypeAidesTerritoiresAide.financement,
        ),
    [data?.results, filters.showAidesFinancieres, filters.showAidesIngenierie],
  );

  return (
    <div className="fr-container pt-8">
      <AideEstimationsListeHeader
        projetId={projetId!}
        // eslint-disable-next-line max-len
        title="Sélectionnez les financements et soutien à l'ingénierie pour lesquels vous souhaitez envoyer une candidature"
      />
      <div className="pfmv-card no-shadow pfmv-card-outline mb-8 w-full p-8">
        <AideEstimationsPanelHeader />

        <AideEditFilter
          filters={filters}
          toggleFilter={toggleFilter}
          aideFinanciereCount={aideFinanciereCount}
          aideTechniqueCount={aideTechniqueCount}
          isLoading={isLoading}
        />

        <div className="aide-card flex flex-wrap gap-6">
          {isLoading
            ? skeletons
            : filteredResults?.map((aide) => <AideCard aide={aide} withSaveButton key={aide.id} />)}
        </div>
      </div>
    </div>
  );
});

AideEdit.displayName = "AideEdit";
