import { GET_REX_WITH_CONTACTS_BY_ID } from "@/src/helpers/routes";
import { useSidePanelFetcher } from "../hooks";

import { AnnuaireRexContent } from "./annuaire-rex-content";
import { AnnuaireRexSkeleton } from "./annuaire-rex-skeleton";
import { RetourExperience } from "@/src/lib/strapi/types/api/retour-experience";

export const AnnuaireRexSidePanelContainer = ({ rexId }: { rexId: number }) => {
  const sidePanel = useSidePanelFetcher<RetourExperience>({
    url: GET_REX_WITH_CONTACTS_BY_ID(rexId),
    Skeleton: AnnuaireRexSkeleton,
    Content: AnnuaireRexContent,
  });
  return <>{sidePanel}</>;
};
