import { UserProjetWithUser } from "@/lib/prisma/prismaCustomTypes";
import { InvitationStatus } from "@prisma/client";

type GroupedUserProjet = Partial<Record<InvitationStatus, UserProjetWithUser[]>>;

export const groupByInvitationStatus = (users: UserProjetWithUser[]) => {
  return users.reduce<GroupedUserProjet>((acc, user) => {
    if (user.deleted_at === null) {
      const status = user.invitation_status;
      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status]!.push(user);
    }
    return acc;
  }, {});
};
