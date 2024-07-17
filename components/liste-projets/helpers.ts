import { ProjetWithRelations } from "@/lib/prisma/prismaCustomTypes";
import { collectivite } from "@prisma/client";
import { orderBy } from "lodash";

export interface ProjetsByCollectivite {
  collectivite: collectivite;
  projets: ProjetWithRelations[];
}

export const groupAndOrderProjetsByCollectivite = (projets: ProjetWithRelations[]): ProjetsByCollectivite[] => {
  const p = projets.reduce<ProjetsByCollectivite[]>((acc, projet) => {
    let existingGroup = acc.find(({ collectivite }) => collectivite.id === projet.collectivite.id);
    if (!existingGroup) {
      existingGroup = { collectivite: projet.collectivite, projets: [] };
      acc.push(existingGroup);
    }
    existingGroup.projets.push(projet);
    return acc;
  }, []);
  return orderBy(p, ["collectivite.nom"], "asc");
};

type SortedProjects = {
  projectsActive: ProjetWithRelations[];
  projectsWithPendingRequest: ProjetWithRelations[];
  projectsRequested: ProjetWithRelations[];
};

export const sortProjectsByInvitationStatus = (
  projects: ProjetWithRelations[],
  currentUserId?: string | null,
): SortedProjects => {
  return projects.reduce<SortedProjects>(
    (acc, project) => {
      const currentUserProject = project.users.find((u) => u.user_id === currentUserId);
      const isAdmin = currentUserProject?.role === "ADMIN";

      if (currentUserProject?.invitation_status === "ACCEPTED") {
        acc.projectsActive.push(project);

        if (isAdmin) {
          const pendingUsers = project.users
            .filter((u) => u.invitation_status === "REQUESTED" && u.user_id !== currentUserId)
            .map((u) => u.user);

          if (pendingUsers.length > 0) {
            acc.projectsWithPendingRequest.push(project);
          }
        }
      } else if (currentUserProject?.invitation_status === "REQUESTED") {
        acc.projectsRequested.push(project);
      }

      return acc;
    },
    { projectsActive: [], projectsWithPendingRequest: [], projectsRequested: [] },
  );
};
