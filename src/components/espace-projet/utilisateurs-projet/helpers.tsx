import {
  ProjetWithPublicRelationsDto,
  UserProjetWithUserDto,
  UserProjetWithUserInfosDto,
} from "@/src/types/dto";
import { InvitationStatus, RoleProjet } from "@/src/generated/prisma/client";

type GroupedUserProjet = Partial<Record<InvitationStatus, UserProjetWithUserDto[]>>;

export const groupByInvitationStatus = (users: UserProjetWithUserDto[]) => {
  return users.reduce<GroupedUserProjet>((acc, user) => {
    const status = user.invitationStatus;
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status]!.push(user);
    return acc;
  }, {});
};

export const checkOtherAdminExists = (
  members?: ProjetWithPublicRelationsDto["users"],
  currentUserId?: string | null,
): boolean => {
  if (!members) {
    return false;
  }

  const otherAdmins = members.filter(
    (member: UserProjetWithUserInfosDto) =>
      member.role === RoleProjet.ADMIN &&
      member.userId !== currentUserId &&
      member.invitationStatus === InvitationStatus.ACCEPTED,
  );

  return otherAdmins.length > 0;
};

export const getCurrentUserRole = (users?: UserProjetWithUserInfosDto[], userId?: string) =>
  users?.find((user) => user.userId === userId)?.role;
