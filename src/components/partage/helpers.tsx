import {
  ProjetWithPublicRelations,
  UserProjetWithPublicUser,
  UserProjetWithUser,
} from "@/lib/prisma/prismaCustomTypes";
import { InvitationStatus, RoleProjet } from "@prisma/client";

type GroupedUserProjet = Partial<Record<InvitationStatus, UserProjetWithUser[]>>;

export const groupByInvitationStatus = (users: UserProjetWithUser[]) => {
  return users.reduce<GroupedUserProjet>((acc, user) => {
    const status = user.invitation_status;
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status]!.push(user);
    return acc;
  }, {});
};

export const checkOtherAdminExists = (
  members?: ProjetWithPublicRelations["users"],
  currentUserId?: string | null,
): boolean => {
  if (!members) {
    return false;
  }

  const otherAdmins = members.filter(
    (member: UserProjetWithPublicUser) =>
      member.role === RoleProjet.ADMIN &&
      member.user_id !== currentUserId &&
      member.invitation_status === InvitationStatus.ACCEPTED,
  );

  return otherAdmins.length > 0;
};

export const getCurrentUserRole = (users?: UserProjetWithPublicUser[], userId?: string) =>
  users?.find((user) => user.user_id === userId)?.role;

export const currentUserIsAdmin = (users?: UserProjetWithUser[], userId?: string) => {
  const role = users?.find((user) => user.user_id === userId)?.role;
  return role === RoleProjet.ADMIN;
};
