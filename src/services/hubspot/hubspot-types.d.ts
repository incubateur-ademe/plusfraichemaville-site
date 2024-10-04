export type HubspotBulkUserUpdate = {
  email: string;
  id: string;
  idProperty: "email";
  properties: {
    firstname: string | null;
    lastname: string | null;
    jobtitle: string | null;
    date_d_inscription_pfmv: string | Date;
    lifecyclestage: string;
    canal_d_acquisition: string | null;
    zip?: string;
  };
};
export type HubspotBulkUserUpdateData = {
  inputs: HubspotBulkUserUpdate[];
};

export type HubspotBulkUsersUpdateResponse = {
  correlationId?: string;
  status: "error" | "COMPLETE";
  message: string;
  category?: "VALIDATION_ERROR";
};
