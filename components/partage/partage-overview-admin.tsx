"use client";

import { useProjetsStore } from "@/stores/projets/provider";
import { PartageOverviewWrapper } from "./partage-overview-wrapper";
import { getCurrentUserRole, groupByInvitationStatus } from "./helpers";
import { InvitationStatus } from "@prisma/client";
import { PartageOverviewMemberSection } from "./partage-overview-member-section";
import { useUserStore } from "@/stores/user/provider";

export const PartageOverviewAdmin = () => {
  const members = useProjetsStore((state) => state.getCurrentProjet()?.users);
  const currentUserId = useUserStore((state) => state.userInfos?.id);
  const currentUserIsAdmin = getCurrentUserRole(members, currentUserId) === "ADMIN";

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
      withSharingOption={currentUserIsAdmin}
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
