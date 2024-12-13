import { GET_REX_WITH_CONTACTS_BY_ID } from "@/src/helpers/routes";
import { useSidePanelFetcher } from "../hooks";

import { SourcingRexContent } from "./sourcing-rex-content";
import { SourcingRexSkeleton } from "./sourcing-rex-skeleton";
import { RetourExperience } from "@/src/lib/strapi/types/api/retour-experience";

export const SourcingRexSidePanelContainer = ({ rexId }: { rexId: number }) => {
  const sidePanel = useSidePanelFetcher<RetourExperience>({
    url: GET_REX_WITH_CONTACTS_BY_ID(rexId),
    Skeleton: SourcingRexSkeleton,
    Content: SourcingRexContent,
  });
  return <>{sidePanel}</>;
};
