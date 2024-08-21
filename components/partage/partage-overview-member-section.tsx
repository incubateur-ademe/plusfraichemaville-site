import clsx from "clsx";
import { PartageOverviewMember } from "./partage-overview-member";
import { UserProjetWithUser } from "@/lib/prisma/prismaCustomTypes";
import { useUserStore } from "@/stores/user/provider";

type PartageOverviewMemberSectionProps = {
  title: string;
  members: UserProjetWithUser[];
  isFirst: boolean;
};

export const PartageOverviewMemberSection = ({ title, members, isFirst }: PartageOverviewMemberSectionProps) => {
  const userId = useUserStore((state) => state.userInfos?.id);
  return (
    <>
      {!isFirst && <h2 className="mb-3 text-[22px] text-pfmv-navy">{title}</h2>}
      {members.map((member, i) => (
        <PartageOverviewMember
          member={member}
          isCurrentUser={member.user_id === userId}
          key={member.id}
          className={clsx(
            i === members.length - 1 && "mb-8",
            !isFirst && i === 0 && "border-t-[1px] border-t-dsfr-border-default-grey",
          )}
        />
      ))}
    </>
  );
};
