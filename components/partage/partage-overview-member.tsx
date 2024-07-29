import clsx from "clsx";
import { PartageOverviewMemberSyllabes } from "./partage-overview-member-syllabes";
import { PartageOverviewMemberStatusAcceptedAdmin } from "./partage-overview-member-status-accepted-admin";
import { UserProjetWithUser } from "@/lib/prisma/prismaCustomTypes";
import { InvitationStatus } from "@prisma/client";
import { ReactElement } from "react";
import { PartageOverviewMemberStatusInvited } from "./partage-overview-member-status-invited";
import { PartageOverviewMemberStatusRequested } from "./partage-overview-member-status-requested";

export type PartageOverviewMemberProps = {
  member: UserProjetWithUser;
  className?: string;
  isCurrentUser?: boolean;
};

export const PartageOverviewMember = ({ className, member, isCurrentUser }: PartageOverviewMemberProps) => {
  const nom = member.user?.nom;
  const prenom = member.user?.prenom;
  const name = !prenom && !nom ? member.email_address : `${prenom ?? "-"} ${nom ?? "-"}`;

  const status: Record<InvitationStatus, ReactElement> = {
    ACCEPTED: <PartageOverviewMemberStatusAcceptedAdmin member={member} isCurrentUser={isCurrentUser} />,
    INVITED: <PartageOverviewMemberStatusInvited member={member} />,
    REQUESTED: <PartageOverviewMemberStatusRequested member={member} />,
    DECLINED: <></>,
  };

  return (
    <div
      className={clsx(
        "relative flex h-[70px] items-center justify-between gap-0",
        "border-b-[1px] border-b-dsfr-border-default-grey pl-20 text-base",
        className,
      )}
    >
      <div className="absolute left-0">
        <PartageOverviewMemberSyllabes name={name} active={member.invitation_status === "ACCEPTED"} />
      </div>
      <span className="w-full max-w-72">
        {name} {isCurrentUser && "(vous)"}
      </span>
      <span className="w-full max-w-72 text-dsfr-text-mention-grey">{member.user?.poste}</span>
      <span className="w-full max-w-56 lowercase">({member.role})</span>
      <span className="w-full max-w-56">{status[member.invitation_status]}</span>
    </div>
  );
};
