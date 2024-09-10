import { getUserWithCollectivites } from "@/lib/prisma/prismaUserQueries";
import { RoleProjet } from "@prisma/client";
import { getOtherAdmins, getUserProjet } from "@/lib/prisma/prisma-user-projet-queries";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth/auth";

export class PermissionManager {
  private async getAuthenticatedUserId(): Promise<string | null> {
    const session = await getServerSession(authOptions);
    return session?.user?.id || null;
  }

  private async getUserProjectRole(projectId: number): Promise<RoleProjet | null> {
    const userId = await this.getAuthenticatedUserId();
    if (!userId) return null;
    return (await getUserProjet(userId, projectId))?.role ?? null;
  }

  async checkOtherAdminsExist(projectId: number) {
    const currentUserId = await this.getAuthenticatedUserId();
    if (!currentUserId) return false;
    return (await getOtherAdmins(currentUserId, projectId)).length > 0;
  }

  async isAdmin(projectId: number): Promise<boolean> {
    const role = await this.getUserProjectRole(projectId);
    return role === RoleProjet.ADMIN;
  }

  async canEditProject(projectId: number) {
    return this.isAdmin(projectId);
  }

  async canDeleteProject(projectId: number) {
    return this.isAdmin(projectId);
  }

  async canShareProject(projectId: number) {
    return this.isAdmin(projectId);
  }

  async canUpdateUser(userIdToUpdate: string) {
    const authenticatedUserId = await this.getAuthenticatedUserId();
    return authenticatedUserId === userIdToUpdate;
  }

  async canViewUserProject(userId: string) {
    const authenticatedUserId = await this.getAuthenticatedUserId();
    return authenticatedUserId === userId;
  }

  async canUpdateUserRole(targetUserId: string, projectId: number) {
    const updatingUserId = await this.getAuthenticatedUserId();
    if (!updatingUserId) return false;

    if (!(await this.isAdmin(projectId))) {
      return false;
    } else if (updatingUserId !== targetUserId) {
      return true;
    } else {
      return await this.checkOtherAdminsExist(projectId);
    }
  }

  async canUserViewCollectiviteProjets(collectiviteId: number): Promise<boolean> {
    const userId = await this.getAuthenticatedUserId();
    if (!userId) return false;

    const user = await getUserWithCollectivites(userId);
    if (user) {
      return user.collectivites.some((collectivite) => collectivite.collectivite_id === collectiviteId);
    }
    return false;
  }
}
