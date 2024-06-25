"use client";

import { useProjetsStore } from "@/stores/projets/provider";
import { AideEstimationsListeHeader } from "./aide-estimations-liste-header";
import { AideEstimationsPanelHeader } from "./aide-estimations-panel-header";
import { Separator } from "@/components/common/separator";
import { useParams } from "next/navigation";
import { AideCard } from "./aide-card";
import { AideCardSkeleton } from "./aide-card-skeleton";
import { useAidesByEstimationFetcher } from "@/hooks/use-aides-by-estimation";
import { AideEditFilter } from "./aide-edit-filter";
import { memo } from "react";
import { countAidesByType } from "../helpers";

export const AideEdit = memo(() => {
  const projetId = useProjetsStore((state) => state.currentProjetId);
  const estimationId = useParams().estimationId as string;
  const skeletons = [...new Array(4)].map((_, i) => <AideCardSkeleton key={i} />);

  const { data, isLoading } = useAidesByEstimationFetcher(estimationId);
  const { aideFinanciereCount, aideTechniqueCount } = countAidesByType(data?.results ?? []);

  return (
    <div className="fr-container pt-8">
      <div className="pfmv-card no-shadow pfmv-card-outline mb-8 w-full p-8">
        <AideEstimationsListeHeader
          projetId={projetId!}
          // eslint-disable-next-line max-len
          title="Sélectionnez les financements et soutien à l'ingénierie pour lesquels vous souhaitez envoyer une candidature"
        />
        <AideEstimationsPanelHeader />
        <Separator className="mb-6" />
        <AideEditFilter
          aideFinanciereCount={aideFinanciereCount}
          aideTechniqueCount={aideTechniqueCount}
          isLoading={isLoading}
        />

        <div className="aide-card flex flex-wrap gap-6">
          {isLoading
            ? skeletons
            : data?.results.map((aide) => <AideCard aide={aide} withSaveButton key={aide.id} />)}
        </div>
      </div>
    </div>
  );
});

AideEdit.displayName = "AideEdit";
