import { GET_REX_WITH_CONTACTS_BY_ID } from "@/src/helpers/routes";
import { useSidePanelFetcher } from "../hooks";

import { SourcingRexContent } from "./sourcing-rex-content";
import { SourcingRexSkeleton } from "./sourcing-rex-skeleton";
import { RetourExperienceResponse } from "../../ficheSolution/type";

export const SourcingRexSidePanelContainer = ({ rexId }: { rexId: number }) => {
  const sidePanel = useSidePanelFetcher<RetourExperienceResponse>({
    url: GET_REX_WITH_CONTACTS_BY_ID(rexId),
    Skeleton: SourcingRexSkeleton,
    Content: SourcingRexContent,
  });
  return <>{sidePanel}</>;
};