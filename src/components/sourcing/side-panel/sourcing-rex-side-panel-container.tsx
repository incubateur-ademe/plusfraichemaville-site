import { GET_REX_WITH_CONTACTS_BY_ID } from "@/src/helpers/routes";
import { useSidePanelFetcher } from "../hooks";

import { SourcingRexSidePanelContent } from "./sourcing-rex-side-panel-content";
import { SourcingRexSidePanelSkeleton } from "./sourcing-rex-side-panel-skeleton";
import { RetourExperienceResponse } from "../../ficheSolution/type";

export const SourcingRexSidePanelContainer = ({ rexId }: { rexId: number }) => {
  const sidePanel = useSidePanelFetcher<RetourExperienceResponse>({
    url: GET_REX_WITH_CONTACTS_BY_ID(rexId),
    Skeleton: SourcingRexSidePanelSkeleton,
    Content: SourcingRexSidePanelContent,
  });
  return <div>{sidePanel}</div>;
};
