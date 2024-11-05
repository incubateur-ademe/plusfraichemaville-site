import { RetourExperience } from "../../retourExperience/type";
import { useSidePanelFetcher } from "../hooks";

import { SourcingRexSidePanelContent } from "./sourcing-rex-side-panel-content";
import { SourcingRexSidePanelSkeleton } from "./sourcing-rex-side-panel-skeleton";

export const SourcingRexSidePanelContainer = ({ retourExperienceId }: { retourExperienceId: number }) => {
  const sidePanel = useSidePanelFetcher<RetourExperience>({
    url: "",
    Skeleton: SourcingRexSidePanelSkeleton,
    Content: SourcingRexSidePanelContent,
  });

  return <div className="h-full">{sidePanel}</div>;
};
