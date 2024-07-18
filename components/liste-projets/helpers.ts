import { ProjetWithRelations, UserProjetWithUser } from "@/lib/prisma/prismaCustomTypes";
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
  projectsInvited: ProjetWithRelations[];
  projectsRequested: ProjetWithRelations[];
};

export const sortProjectsByInvitationStatus = (
  projects: ProjetWithRelations[],
  currentUserId?: string | null,
): SortedProjects => {
  return projects.reduce<SortedProjects>(
    (acc, project) => {
      const currentUserProject = project.users.find((u) => u.user_id === currentUserId);

      if (currentUserProject?.invitation_status === "ACCEPTED") {
        acc.projectsActive.push(project);
      } else if (currentUserProject?.invitation_status === "INVITED") {
        acc.projectsInvited.push(project);
      } else if (currentUserProject?.invitation_status === "REQUESTED") {
        acc.projectsRequested.push(project);
      }

      return acc;
    },
    {
      projectsActive: [],
      projectsInvited: [],
      projectsRequested: [],
    },
  );
};

export const getOldestAdmin = (project: ProjetWithRelations) => {
  const oldestAdmin = project.users
    .filter((userProjet) => userProjet.role === "ADMIN" && userProjet.invitation_status === "ACCEPTED")
    .reduce<UserProjetWithUser | undefined>((oldest, current) => {
      if (!oldest) return current;
      return oldest.created_at <= current.created_at ? oldest : current;
    }, undefined);

  if (!oldestAdmin || !oldestAdmin.user) {
    return { username: null };
  }

  return {
    username: `${oldestAdmin.user.prenom} ${oldestAdmin.user.nom}` || null,
  };
};

export const getAllUserProjectCount = (project: ProjetWithRelations) => {
  const allUsersProject = project.users.filter((user) => user.invitation_status === "ACCEPTED");
  return allUsersProject.length;
};

export const getCurrentUserProjectInfos = (
  project: ProjetWithRelations,
  currentUserId?: string,
): UserProjetWithUser | null => {
  const userProjectLine = project.users.find((userProjet) => userProjet.user_id === currentUserId);
  return userProjectLine || null;
};
