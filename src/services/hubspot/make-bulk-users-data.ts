import { User } from "@prisma/client";

export const makeBulkUsersData = async (users: User[]) => {
  return users.map((user) => ({
    email: user.email,
    properties: {
      firstname: user.prenom,
      lastname: user.nom,
      jobtitle: user.poste,
    },
  }));
};
