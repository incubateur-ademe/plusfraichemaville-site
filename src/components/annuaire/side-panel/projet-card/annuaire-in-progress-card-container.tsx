import { GET_PUBLIC_PROJET_BY_ID } from "@/src/helpers/routes";
import { ProjetWithPublicRelationsDto } from "@/src/types/dto";
import { useSidePanelFetcher } from "@/src/components/annuaire/hooks";
import { AnnuaireInProgressCardSkeleton } from "@/src/components/annuaire/side-panel/projet-card/annuaire-in-progress-card-skeleton";
import { AnnuaireInProgressCardContent } from "@/src/components/annuaire/side-panel/projet-card/annuaire-in-progress-card-content";

export const AnnuaireInProgressCardPanelContainer = ({
  projetId,
  onClick,
}: {
  projetId: number;
  onClick?: () => void;
}) => {
  const sidePanel = useSidePanelFetcher<ProjetWithPublicRelationsDto>({
    url: GET_PUBLIC_PROJET_BY_ID(projetId),
    Skeleton: AnnuaireInProgressCardSkeleton,
    Content: AnnuaireInProgressCardContent,
    onClick: onClick,
  });
  return <>{sidePanel}</>;
};
