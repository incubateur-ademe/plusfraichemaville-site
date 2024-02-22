export const hasPermissionToUpdateUser = (userIdToUpdate: string, userIdUpdating: string) => {
  return userIdToUpdate === userIdUpdating;
};
