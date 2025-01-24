import { GET_PUBLIC_PROJET_BY_ID } from "@/src/helpers/routes";
import { ProjetWithPublicRelations } from "@/src/lib/prisma/prismaCustomTypes";
// eslint-disable-next-line max-len
import { AnnuaireInProgressProjetSkeleton } from "@/src/components/annuaire/side-panel/annuaire-in-progress-projet-skeleton";
// eslint-disable-next-line max-len
import { AnnuaireInProgressProjetContent } from "@/src/components/annuaire/side-panel/annuaire-in-progress-projet-content";
import { useSidePanelFetcher } from "@/src/components/annuaire/hooks";

export const SourcingInProgressSidePanelContainer = ({ projetId }: { projetId: number }) => {
  const sidePanel = useSidePanelFetcher<ProjetWithPublicRelations>({
    url: GET_PUBLIC_PROJET_BY_ID(projetId),
    Skeleton: AnnuaireInProgressProjetSkeleton,
    Content: AnnuaireInProgressProjetContent,
  });
  return <>{sidePanel}</>;
};
