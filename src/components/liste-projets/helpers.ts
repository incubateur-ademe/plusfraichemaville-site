import { ProjetWithPublicRelations, UserProjetWithPublicUser } from "@/src/lib/prisma/prismaCustomTypes";
import { collectivite, InvitationStatus, RoleProjet } from "@prisma/client";
import { orderBy } from "lodash";

export interface ProjetsByCollectivite {
  collectivite: collectivite;
  projets: ProjetWithPublicRelations[];
}

export const groupAndOrderProjetsByCollectivite = (projets: ProjetWithPublicRelations[]): ProjetsByCollectivite[] => {
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
  projectsInvited: ProjetWithPublicRelations[];
  projectsRequested: ProjetWithPublicRelations[];
};

export const sortProjectsByInvitationStatus = (
  projects: ProjetWithPublicRelations[],
  currentUserId?: string | null,
): SortedProjects => {
  return projects.reduce<SortedProjects>(
    (acc, project) => {
      const currentUserProject = project.users.find((u) => u.user_id === currentUserId);

      if (currentUserProject?.invitation_status === InvitationStatus.INVITED) {
        acc.projectsInvited.push(project);
      } else if (currentUserProject?.invitation_status === InvitationStatus.REQUESTED) {
        acc.projectsRequested.push(project);
      }

      return acc;
    },
    {
      projectsInvited: [],
      projectsRequested: [],
    },
  );
};

export const getOldestAdmin = (project: ProjetWithPublicRelations) => {
  const oldestAdmin = project.users
    .filter(
      (userProjet) =>
        userProjet.role === RoleProjet.ADMIN && userProjet.invitation_status === InvitationStatus.ACCEPTED,
    )
    .reduce<UserProjetWithPublicUser | undefined>((oldest, current) => {
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

export const getAllUserProjectCount = (project: ProjetWithPublicRelations) => {
  const allUsersProject = project.users.filter((user) => user.invitation_status === InvitationStatus.ACCEPTED);
  return allUsersProject.length;
};

export const getCurrentUserProjectInfos = (
  project: ProjetWithPublicRelations,
  currentUserId?: string,
): UserProjetWithPublicUser | null => {
  const userProjectLine = project.users.find((userProjet) => userProjet.user_id === currentUserId);
  return userProjectLine || null;
};