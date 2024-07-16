import { getOtherAdmins, getUserProjectRole as getUserProjectRoleQuery } from "@/lib/prisma/prismaUserQueries";
import { RoleProjet } from "@prisma/client";

export class PermissionManager {
  private async getUserProjectRole(userId: string, projectId: number): Promise<RoleProjet | null> {
    return getUserProjectRoleQuery(userId, projectId);
  }

  private async checkOtherAdminsExist(currentUserId: string, projectId: number) {
    return getOtherAdmins(currentUserId, projectId);
  }

  private async isAdmin(userId: string, projectId: number): Promise<boolean> {
    const role = await this.getUserProjectRole(userId, projectId);
    return role === RoleProjet.ADMIN;
  }
  private async isAdminOrEditeur(userId: string, projectId: number): Promise<boolean> {
    const role = await this.getUserProjectRole(userId, projectId);
    return role === RoleProjet.ADMIN || role === RoleProjet.EDITEUR;
  }

  async canViewProject(userId: string, projectId: number) {
    const role = await this.getUserProjectRole(userId, projectId);
    return role !== null;
  }

  async canEditProject(userId: string, projectId: number) {
    return this.isAdminOrEditeur(userId, projectId);
  }

  async canDeleteProject(userId: string, projectId: number) {
    return this.isAdmin(userId, projectId);
  }

  async canShareProject(userId: string, projectId: number) {
    return this.isAdmin(userId, projectId);
  }

  async canUpdateUser(userIdToUpdate: string, userIdUpdating: string) {
    return userIdToUpdate === userIdUpdating;
  }

  async canViewUserProject(authenticatedUserId: string, userId: string) {
    return authenticatedUserId === userId;
  }

  async canUpdateUserRole(updatingUserId: string, targetUserId: string, projectId: number) {
    const updatingUserRole = await this.getUserProjectRole(updatingUserId, projectId);

    if (updatingUserRole !== RoleProjet.ADMIN) {
      return false;
    } else if (updatingUserId === targetUserId) {
      const otherAdminsExist = await this.checkOtherAdminsExist(updatingUserId, projectId);
      if (!otherAdminsExist) {
        return false;
      }
    } else return true;
  }
}
