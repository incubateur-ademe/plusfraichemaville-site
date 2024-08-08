import {
  getOtherAdmins,
  getUserProjectRole as getUserProjectRoleQuery,
  getUserWithCollectivites,
} from "@/lib/prisma/prismaUserQueries";
import { RoleProjet } from "@prisma/client";

export class PermissionManager {
  private async getUserProjectRole(userId: string, projectId: number): Promise<RoleProjet | null> {
    return getUserProjectRoleQuery(userId, projectId);
  }

  private async checkOtherAdminsExist(currentUserId: string, projectId: number) {
    return (await getOtherAdmins(currentUserId, projectId)).length > 0;
  }

  private async isAdmin(userId: string, projectId: number): Promise<boolean> {
    const role = await this.getUserProjectRole(userId, projectId);
    return role === RoleProjet.ADMIN;
  }

  async canEditProject(userId: string, projectId: number) {
    return this.isAdmin(userId, projectId);
  }

  async canDeleteProject(userId: string, projectId: number) {
    return this.isAdmin(userId, projectId);
  }

  async canShareProject(userId: string, projectId: number) {
    return this.isAdmin(userId, projectId);
  }

  canUpdateUser(userIdToUpdate: string, userIdUpdating: string) {
    return userIdToUpdate === userIdUpdating;
  }

  canViewUserProject(authenticatedUserId: string, userId: string) {
    return authenticatedUserId === userId;
  }

  async canUpdateUserRole(updatingUserId: string, targetUserId: string, projectId: number) {
    if (!(await this.isAdmin(updatingUserId, projectId))) {
      return false;
    } else if (updatingUserId !== targetUserId) {
      return true;
    } else {
      return await this.checkOtherAdminsExist(updatingUserId, projectId);
    }
  }

  async canUserViewCollectiviteProjets(userId: string, collectiviteId: number): Promise<boolean> {
    const user = await getUserWithCollectivites(userId);
    if (user) {
      return user.collectivites.some((collectivite) => collectivite.collectivite_id === collectiviteId);
    }
    return false;
  }
}
