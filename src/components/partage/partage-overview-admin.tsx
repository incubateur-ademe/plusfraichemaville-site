"use client";

import { useProjetsStore } from "@/src/stores/projets/provider";
import { PartageOverviewWrapper } from "./partage-overview-wrapper";
import { groupByInvitationStatus } from "./helpers";
import { InvitationStatus } from "@prisma/client";
import { PartageOverviewMemberSection } from "./partage-overview-member-section";
import { useCanEditProjet } from "@/src/hooks/use-can-edit-projet";

export const PartageOverviewAdmin = () => {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  const members = currentProjet?.users;
  const canEditProjet = useCanEditProjet(currentProjet?.id);

  if (!members) return null;

  const membersByStatus = groupByInvitationStatus(members);

  const sections: { title: string; status: InvitationStatus }[] = [
    { title: "", status: InvitationStatus.ACCEPTED },
    { title: "Accès demandé", status: InvitationStatus.REQUESTED },
    { title: "Invité(s)", status: InvitationStatus.INVITED },
  ];

  return (
    <PartageOverviewWrapper
      title="Gérer les membres de votre collectivité sur ce projet"
      withSharingOption={canEditProjet}
    >
      {sections.map(
        ({ title, status }, index) =>
          membersByStatus[status] && (
            <PartageOverviewMemberSection
              key={status}
              title={title}
              members={membersByStatus[status]!}
              isFirst={index === 0}
            />
          ),
      )}
    </PartageOverviewWrapper>
  );
};
