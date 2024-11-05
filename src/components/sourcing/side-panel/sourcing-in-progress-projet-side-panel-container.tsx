import { GET_PUBLIC_PROJET_BY_ID } from "@/src/helpers/routes";
import { ProjetWithPublicRelations } from "@/src/lib/prisma/prismaCustomTypes";
// eslint-disable-next-line max-len
import { SourcingInProgressProjetSkeleton } from "@/src/components/sourcing/side-panel/sourcing-in-progress-projet-skeleton";
import { SourcingInProgressProjetCard } from "@/src/components/sourcing/side-panel/sourcing-in-progress-projet-card";
import { useSidePanelFetcher } from "@/src/components/sourcing/hooks";

export const SourcingInProgressSidePanelContainer = ({ projetId }: { projetId: number }) => {
  const sidePanel = useSidePanelFetcher<ProjetWithPublicRelations>({
    url: GET_PUBLIC_PROJET_BY_ID(projetId),
    Skeleton: SourcingInProgressProjetSkeleton,
    Content: SourcingInProgressProjetCard,
  });
  return <div>{sidePanel}</div>;
};
