import { RoleProjet } from "@prisma/client";

type UserRole = {
  code: RoleProjet;
  label: string;
};

export const ROLE_LECTEUR: UserRole = {
  code: RoleProjet.LECTEUR,
  label: "lecteur",
};

export const ROLE_EDITEUR: UserRole = {
  code: RoleProjet.EDITEUR,
  label: "éditeur",
};

const ROLE_ADMIN: UserRole = {
  code: RoleProjet.ADMIN,
  label: "admin",
};

const ALL_USER_ROLES: UserRole[] = [ROLE_ADMIN, ROLE_EDITEUR, ROLE_LECTEUR];

export const getUserRoleFromCode = (roleCode?: RoleProjet) => ALL_USER_ROLES.find((r) => r.code === roleCode);
