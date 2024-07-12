import { InvitationStatus, RoleProjet } from "@prisma/client";
import clsx from "clsx";
import { PartageOverviewMemberSyllabes } from "./partage-overview-member-syllabes";

type PartageOverviewMemberProps = {
  name?: string | null;
  poste?: string | null;
  role: RoleProjet;
  statut: InvitationStatus;
  className?: string;
  isCurrentUser?: boolean;
};

export const PartageOverviewMember = ({
  name,
  poste,
  role,
  statut,
  className,
  isCurrentUser,
}: PartageOverviewMemberProps) => {
  return (
    <div
      className={clsx(
        "relative flex h-[70px] items-center justify-between gap-0",
        "border-b-[1px] border-b-dsfr-border-default-grey pl-20 text-base",
        className,
      )}
    >
      <div className="absolute left-0">
        <PartageOverviewMemberSyllabes name={name} active={statut === "ACCEPTED"} />
      </div>
      <span className="w-full max-w-72">
        {name} {isCurrentUser && "(vous)"}
      </span>
      <span className="w-full max-w-72 text-dsfr-text-mention-grey">{poste}</span>
      <span className="w-full max-w-56 lowercase">({role})</span>
      <span className="w-full max-w-56">{statut}</span>
    </div>
  );
};
