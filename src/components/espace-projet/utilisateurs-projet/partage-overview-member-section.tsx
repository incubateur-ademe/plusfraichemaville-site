import { PartageOverviewMember } from "./partage-overview-member";
import { UserProjetWithUser } from "@/src/lib/prisma/prismaCustomTypes";
import { useUserStore } from "@/src/stores/user/provider";

type PartageOverviewMemberSectionProps = {
  title?: string;
  members: UserProjetWithUser[];
};

export const PartageOverviewMemberSection = ({ title, members }: PartageOverviewMemberSectionProps) => {
  const userId = useUserStore((state) => state.userInfos?.id);
  return (
    <section className="mb-8">
      {title && (
        <>
          <h2 className="mb-3 text-[22px] text-pfmv-navy">{title}</h2>
          <hr className="h-[1px] p-0" />
        </>
      )}
      {members.map((member) => (
        <div key={member.id}>
          <PartageOverviewMember member={member} isCurrentUser={member.user_id === userId} />
          <hr className="h-[1px] p-0" />
        </div>
      ))}
    </section>
  );
};
