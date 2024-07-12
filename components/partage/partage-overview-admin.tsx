"use client";

import { useProjetsStore } from "@/stores/projets/provider";
import { PartageOverviewWrapper } from "./partage-overview-wrapper";
import { groupByInvitationStatus } from "./helpers";
import { InvitationStatus } from "@prisma/client";
import { PartageOverviewMemberSection } from "./partage-overview-member-section";

export const PartageOverviewAdmin = () => {
  const members = useProjetsStore((state) => state.getCurrentProjet()?.users);

  if (!members) return null;

  const membersByStatus = groupByInvitationStatus(members);
  const sections: { title: string; status: InvitationStatus }[] = [
    { title: "", status: "ACCEPTED" },
    { title: "Accès demandé", status: "REQUESTED" },
    { title: "Invité(e.s)", status: "INVITED" },
  ];

  return (
    <PartageOverviewWrapper title="Gérer les membres de votre collectivité sur ce projet" withSharingOption>
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
