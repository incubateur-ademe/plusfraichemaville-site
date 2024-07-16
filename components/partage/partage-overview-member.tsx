import clsx from "clsx";
import { PartageOverviewMemberSyllabes } from "./partage-overview-member-syllabes";
import { PartageOverviewMemberStatusAdmin } from "./partage-overview-member-status-admin";
import { UserProjetWithUser } from "@/lib/prisma/prismaCustomTypes";

export type PartageOverviewMemberProps = {
  member: UserProjetWithUser;
  className?: string;
  isCurrentUser?: boolean;
};

export const PartageOverviewMember = ({ className, member, isCurrentUser }: PartageOverviewMemberProps) => {
  const name = `${member.user?.prenom ?? "-"} ${member.user?.nom ?? "-"}`;
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
      <span className="w-full max-w-56">
        <PartageOverviewMemberStatusAdmin member={member} />
      </span>
    </div>
  );
};
