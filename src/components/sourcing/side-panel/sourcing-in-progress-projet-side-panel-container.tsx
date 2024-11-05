import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { GET_PUBLIC_PROJET_BY_ID, GET_REX_WITH_CONTACTS_BY_ID } from "@/src/helpers/routes";
import { ProjetWithPublicRelations } from "@/src/lib/prisma/prismaCustomTypes";
// eslint-disable-next-line max-len
import { SourcingInProgressProjetSkeleton } from "@/src/components/sourcing/side-panel/sourcing-in-progress-projet-skeleton";
import { SourcingInProgressProjetCard } from "@/src/components/sourcing/side-panel/sourcing-in-progress-projet-card";
import { useSidePanelFetcher } from "@/src/components/sourcing/hooks";
import { RetourExperienceResponse } from "@/src/components/ficheSolution/type";
import { SourcingRexSidePanelSkeleton } from "@/src/components/sourcing/side-panel/sourcing-rex-side-panel-skeleton";
import { SourcingRexSidePanelContent } from "@/src/components/sourcing/side-panel/sourcing-rex-side-panel-content";

export const SourcingInProgressSidePanelContainer = ({ projetId }: { projetId: number }) => {

  const sidePanel = useSidePanelFetcher<ProjetWithPublicRelations>({
    url: GET_PUBLIC_PROJET_BY_ID(projetId),
    Skeleton: SourcingInProgressProjetSkeleton,
    Content: SourcingInProgressProjetCard,
  });
  return <div>{sidePanel}</div>;

};
