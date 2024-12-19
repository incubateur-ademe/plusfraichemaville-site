import { getUserWithCollectivites } from "@/src/lib/prisma/prismaUserQueries";
import { RoleProjet } from "@prisma/client";
import { getOtherAdmins, getUserProjet } from "@/src/lib/prisma/prisma-user-projet-queries";
import { Session } from "next-auth";

export class PermissionManager {
  authenticatedUserId?: string;

  constructor(session: Session | null) {
    this.authenticatedUserId = session?.user.id;
  }

  private async getUserProjectRole(projectId: number): Promise<RoleProjet | null> {
    if (!this.authenticatedUserId) {
      return null;
    }
    return (await getUserProjet(this.authenticatedUserId, projectId))?.role ?? null;
  }

  async checkOtherAdminsExist(projectId: number, targetUserId: string) {
    return (await getOtherAdmins(targetUserId, projectId)).length > 0;
  }

  async isAdmin(projectId: number): Promise<boolean> {
    const role = await this.getUserProjectRole(projectId);
    return role === RoleProjet.ADMIN;
  }

  async canEditProject(projectId: number) {
    const role = await this.getUserProjectRole(projectId);
    return role === RoleProjet.ADMIN || role === RoleProjet.EDITEUR;
  }

  async canDeleteProject(projectId: number) {
    return this.isAdmin(projectId);
  }

  async canShareProject(projectId: number) {
    return this.isAdmin(projectId);
  }

  canUpdateUser(userIdToUpdate: string) {
    return this.authenticatedUserId === userIdToUpdate;
  }

  canViewUserProject(userId: string) {
    return this.authenticatedUserId === userId;
  }

  async canUpdateUserRole(targetUserId: string, projectId: number) {
    if (!this.authenticatedUserId) {
      return false;
    }

    if (!(await this.isAdmin(projectId))) {
      return false;
    } else if (this.authenticatedUserId !== targetUserId) {
      return true;
    } else {
      return await this.checkOtherAdminsExist(projectId, targetUserId);
    }
  }

  async canUserViewCollectiviteProjets(collectiviteId: number): Promise<boolean> {
    if (!this.authenticatedUserId) {
      return false;
    }

    const user = await getUserWithCollectivites(this.authenticatedUserId);
    if (user) {
      return user.collectivites.some((collectivite) => collectivite.collectivite_id === collectiviteId);
    }
    return false;
  }
}
