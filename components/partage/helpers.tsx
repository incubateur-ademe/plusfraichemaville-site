import { ProjetWithRelations, UserProjetWithUser } from "@/lib/prisma/prismaCustomTypes";
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

export const checkOtherAdminExists = (
  members?: ProjetWithRelations["users"],
  currentUserId?: string | null,
): boolean => {
  if (!members) {
    return false;
  }

  const otherAdmins = members.filter(
    (member: UserProjetWithUser) =>
      member.role === "ADMIN" && member.user_id !== currentUserId && member.invitation_status === "ACCEPTED",
  );

  return otherAdmins.length > 0;
};

export const getCurrentUserRole = (users?: UserProjetWithUser[], userId?: string) =>
  users?.find((user) => user.user_id === userId)?.role;

export const currentUserIsAdmin = (users?: UserProjetWithUser[], userId?: string) => {
  const role = users?.find((user) => user.user_id === userId)?.role;
  return role === "ADMIN";
};
