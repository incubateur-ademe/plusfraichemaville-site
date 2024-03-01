export const hasPermissionToUpdateUser = (userIdToUpdate: string, userIdUpdating: string) => {
  return userIdToUpdate === userIdUpdating;
};

export const hasPermissionToUpdateProjet = (authenticatedUserId: string, updaterUserId: string) => {
  return authenticatedUserId === updaterUserId;
};

export const hasPermissionToViewUserProjet = (authenticatedUserId: string, userId: string) => {
  return authenticatedUserId === userId;
};
