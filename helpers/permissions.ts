export const hasPermissionToUpdateUser = (userIdToUpdate: string, userIdUpdating: string) => {
  return userIdToUpdate === userIdUpdating;
};

export const hasPermissionToUpdateProjet = (userId: string, createdByUserId: string) => {
  return userId === createdByUserId;
};
