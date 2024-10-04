import { User } from "@prisma/client";
import { HubspotBulkUserUpdateData } from "./hubspot-types";

export const makeHubspotBulkUsersData = (users: User[]): HubspotBulkUserUpdateData => ({
  inputs: users.map((user) => ({
    email: user.email,
    id: user.email,
    idProperty: "email",
    properties: {
      firstname: user.prenom,
      lastname: user.nom,
      jobtitle: user.poste,
      lifecyclestage: "opportunity",
      canal_d_acquisition: user.canal_acquisition,
      date_d_inscription_pfmv: new Date(user.created_at).setUTCHours(0, 0, 0, 0).toString(),
    },
  })),
});
