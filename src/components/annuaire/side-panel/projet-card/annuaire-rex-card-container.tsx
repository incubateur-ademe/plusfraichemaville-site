import { GET_REX_WITH_CONTACTS_BY_ID } from "@/src/helpers/routes";

import { RetourExperience } from "@/src/lib/strapi/types/api/retour-experience";
import { AnnuaireRexCardSkeleton } from "@/src/components/annuaire/side-panel/projet-card/annuaire-rex-card-skeleton";
import { AnnuaireRexCardContent } from "@/src/components/annuaire/side-panel/projet-card/annuaire-rex-card-content";
import { useSidePanelFetcher } from "@/src/components/annuaire/hooks";

export const AnnuaireRexCardContainer = ({ rexId, onClick }: { rexId: number; onClick?: () => void }) => {
  const sidePanel = useSidePanelFetcher<RetourExperience>({
    url: GET_REX_WITH_CONTACTS_BY_ID(rexId),
    Skeleton: AnnuaireRexCardSkeleton,
    Content: AnnuaireRexCardContent,
    onClick: onClick,
  });
  return <>{sidePanel}</>;
};
