"use client";

import { useProjetsStore } from "@/stores/projets/provider";
import { AideEstimationsListeHeader } from "./aide-estimations-liste-header";
import { AideEstimationsPanelHeader } from "./aide-estimations-panel-header";
import { Separator } from "@/components/common/separator";
import { useParams } from "next/navigation";
import { useSwrWithFetcher } from "@/hooks/use-swr-with-fetcher";
import { AidesTerritoiresAidesResponse } from "../types";
import { SEARCH_AIDE_FOR_ESTIMATION_URL } from "@/app/api/search-aides-for-estimation/route";

export const AideEdit = () => {
  const projetId = useProjetsStore((state) => state.currentProjetId);
  const estimationId = useParams().estimationId;

  const data = useSwrWithFetcher<AidesTerritoiresAidesResponse>(SEARCH_AIDE_FOR_ESTIMATION_URL(+estimationId));

  console.log(data.data);
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
      </div>
      {/* <div className="aide-card flex flex-wrap gap-6">
        {aidesId.map((aideId) => (
          <AideCard aideId={aideId} key={aideId} />
        ))}
      </div> */}
    </div>
  );
};
