import { captureError } from "@/src/lib/sentry/sentryCustomMessage";
import { ConnectContact, ConnectProjet, ConnectResponse } from "./types";
import { UserWithAdminProjets } from "@/src/lib/prisma/prismaCustomTypes";
import { mapProjetToConnectProjet, mapUserToConnectContact } from "@/src/services/connect/connect-helpers";
import { flattenUsersProjectsToProjects } from "@/src/components/liste-projets/helpers";

const CONNECT_API_BASE_URL = process.env.CONNECT_API_BASE_URL;

const config = {
  headers: {
    "Content-Type": "application/json",
    client_id: process.env.CONNECT_CLIENT_ID ?? "",
    client_secret: process.env.CONNECT_CLIENT_SECRET ?? "",
  },
};

export const createConnectContact = async (contact: ConnectContact): Promise<ConnectResponse | undefined> => {
  try {
    const response = await fetch(`${CONNECT_API_BASE_URL}/personnes`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify(contact),
    });

    if (!response.ok) {
      captureError(`Erreur lors de la création du contact dans Connect: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    captureError("Exception lors de la création du contact dans Connect:", error);
  }
};

export const createConnectProjet = async (projet: ConnectProjet): Promise<ConnectResponse | undefined> => {
  try {
    const response = await fetch(`${CONNECT_API_BASE_URL}/projets`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify(projet),
    });

    if (!response.ok) {
      captureError(`Erreur lors de la création du projet dans Connect: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    captureError("Exception lors de la création du projet dans Connect:", error);
  }
};

export const connectBatchSync = async (
  usersWithAdminProjets: UserWithAdminProjets[],
): Promise<{
  success: boolean;
  errors: ({ email: string; error: string } | { idProjet: string; error: string })[];
  message: string;
}> => {
  const contacts = usersWithAdminProjets.map((user) => mapUserToConnectContact(user));
  let createdContactsCount = 0;
  let createdProjetsCount = 0;
  const errors: ({ email: string; error: string } | { idProjet: string; error: string })[] = [];

  for (const contact of contacts) {
    try {
      const connectResult = await createConnectContact(contact);
      if (!connectResult?.success) {
        errors.push({ email: contact.email, error: `${connectResult?.message} - ${connectResult?.errorMessage}` });
      } else {
        createdContactsCount++;
      }
    } catch (error) {
      if (error instanceof Error) {
        errors.push({ email: contact.email, error: error.message });
      }
    }
  }

  const allProjets = flattenUsersProjectsToProjects(usersWithAdminProjets).map(mapProjetToConnectProjet);
  for (const projet of allProjets) {
    try {
      const connectResult = await createConnectProjet(projet);
      if (!connectResult?.success) {
        errors.push({ idProjet: projet.idProjet, error: `${connectResult?.message} - ${connectResult?.errorMessage}` });
      } else {
        createdProjetsCount++;
      }
    } catch (error) {
      if (error instanceof Error) {
        errors.push({ idProjet: projet.idProjet, error: error.message });
      }
    }
  }

  return {
    success: errors.length === 0,
    errors,
    message: `Synchronisation avec Connect : 
    ${createdContactsCount} contact(s) créé(s) / mis à jour..
    ${createdProjetsCount} projet(s) créés / mis à jour.`,
  };
};
