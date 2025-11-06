"use client";

import { useProjetsStore } from "@/src/stores/projets/provider";
import { PartageOverviewWrapper } from "./partage-overview-wrapper";
import { groupByInvitationStatus } from "./helpers";
import { InvitationStatus } from "@/src/generated/prisma/client";
import { PartageOverviewMemberSection } from "./partage-overview-member-section";
import { useCanEditProjet } from "@/src/hooks/use-can-edit-projet";

export const PartageOverviewAdmin = () => {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  const members = currentProjet?.users;
  const canEditProjet = useCanEditProjet(currentProjet?.id);

  if (!members) return null;

  const membersByStatus = groupByInvitationStatus(members);

  const sections: { title?: string; status: InvitationStatus }[] = [
    { status: InvitationStatus.ACCEPTED },
    { title: "Demande d'accès en attente", status: InvitationStatus.REQUESTED },
    { title: "Invitation(s) en attente", status: InvitationStatus.INVITED },
  ];

  return (
    <PartageOverviewWrapper withSharingOption={canEditProjet}>
      {sections.map(
        ({ title, status }) =>
          membersByStatus[status] && (
            <PartageOverviewMemberSection key={status} title={title} members={membersByStatus[status]!} />
          ),
      )}
    </PartageOverviewWrapper>
  );
};
