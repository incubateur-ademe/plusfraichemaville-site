import {
  CollectiviteDto,
  ProjetWithAdminUserDto,
  ProjetWithPublicRelationsDto,
  UserProjetWithUserInfosDto,
  UserWithAdminProjetsDto,
} from "@/src/types/dto";
import { InvitationStatus, RoleProjet } from "@/src/generated/prisma/client";
import orderBy from "lodash/orderBy";

export interface ProjetsByCollectivite {
  collectivite: CollectiviteDto;
  projets: ProjetWithPublicRelationsDto[];
}

export const groupAndOrderProjetsByCollectivite = (
  projets: ProjetWithPublicRelationsDto[],
): ProjetsByCollectivite[] => {
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
  projectsInvited: ProjetWithPublicRelationsDto[];
  projectsRequested: ProjetWithPublicRelationsDto[];
};

export const sortProjectsByInvitationStatus = (
  projects: ProjetWithPublicRelationsDto[],
  currentUserId?: string | null,
): SortedProjects => {
  return projects.reduce<SortedProjects>(
    (acc, project) => {
      const currentUserProject = project.users.find((u) => u.userId === currentUserId);

      if (currentUserProject?.invitationStatus === InvitationStatus.INVITED) {
        acc.projectsInvited.push(project);
      } else if (currentUserProject?.invitationStatus === InvitationStatus.REQUESTED) {
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

export const getOldestAdmin = (project: ProjetWithPublicRelationsDto): UserProjetWithUserInfosDto | null => {
  const oldestAdmin = project.users
    .filter(
      (userProjet) => userProjet.role === RoleProjet.ADMIN && userProjet.invitationStatus === InvitationStatus.ACCEPTED,
    )
    .reduce<UserProjetWithUserInfosDto | undefined>((oldest, current) => {
      if (!oldest) return current;
      return oldest.createdAt <= current.createdAt ? oldest : current;
    }, undefined);

  if (!oldestAdmin || !oldestAdmin.user) {
    return null;
  }

  return oldestAdmin;
};

export const getAllUserProjectCount = (project: ProjetWithPublicRelationsDto) => {
  const allUsersProject = project.users.filter((user) => user.invitationStatus === InvitationStatus.ACCEPTED);
  return allUsersProject.length;
};

export const getCurrentUserProjectInfos = (
  project: ProjetWithPublicRelationsDto,
  currentUserId?: string,
): UserProjetWithUserInfosDto | null => {
  const userProjectLine = project.users.find((userProjet) => userProjet.userId === currentUserId);
  return userProjectLine || null;
};

export const flattenUsersProjectsToProjects = (
  usersWithProjects: UserWithAdminProjetsDto[],
): ProjetWithAdminUserDto[] => {
  return usersWithProjects.flatMap((user) =>
    user.projets.map((projet) => ({
      ...projet,
      users: [{ user: { email: user.email }, role: "ADMIN" }],
    })),
  );
};
