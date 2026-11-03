import { captureError } from "@/src/lib/sentry/sentryCustomMessage";
import { ConnectContact, ConnectProjet, ConnectResponse } from "./types";
import { UserWithAdminProjets } from "@/src/lib/prisma/prismaCustomTypes";
import { mapProjetToConnectProjet, mapUserToConnectContact } from "@/src/services/connect/connect-helpers";
import { flattenUsersProjectsToProjects } from "@/src/components/liste-projets/helpers";

const CONNECT_API_BASE_URL = process.env.CONNECT_API_BASE_URL;
const CONNECT_BATCH_DEFAULT_DELAY_MS = 300;
const CONNECT_BATCH_MAX_ATTEMPTS = 3;
const CONNECT_RETRY_BASE_DELAY_MS = 1000;

const wait = (delayMs: number) => new Promise((resolve) => setTimeout(resolve, delayMs));

const config = {
  headers: {
    "Content-Type": "application/json",
    client_id: process.env.CONNECT_CLIENT_ID ?? "",
    client_secret: process.env.CONNECT_CLIENT_SECRET ?? "",
  },
};

const postToConnect = async (path: string, body: ConnectContact | ConnectProjet, maxAttempts: number) => {
  const post = () =>
    fetch(`${CONNECT_API_BASE_URL}${path}`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify(body),
    });

  let response = await post();
  for (let attempt = 1; response.status >= 500 && attempt < maxAttempts; attempt++) {
    console.log(`Connect ${path} : HTTP ${response.status}, tentative ${attempt + 1}/${maxAttempts} à venir...`);
    await response.body?.cancel();
    await wait(CONNECT_RETRY_BASE_DELAY_MS * attempt);
    response = await post();
  }
  return response;
};

export const createConnectContact = async (
  contact: ConnectContact,
  maxAttempts = 1,
): Promise<ConnectResponse | undefined> => {
  try {
    const response = await postToConnect("/personnes", contact, maxAttempts);

    if (!response.ok) {
      captureError(`Erreur lors de la création du contact dans Connect: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    captureError("Exception lors de la création du contact dans Connect:", error);
  }
};

export const createConnectProjet = async (
  projet: ConnectProjet,
  maxAttempts = 1,
): Promise<ConnectResponse | undefined> => {
  try {
    const response = await postToConnect("/projets", projet, maxAttempts);

    if (!response.ok) {
      captureError(`Erreur lors de la création du projet ${projet.idProjet} dans Connect: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    captureError(`Exception lors de la création du projet ${projet.idProjet} dans Connect:`, error);
  }
};

export const connectBatchSync = async (
  usersWithAdminProjets: UserWithAdminProjets[],
  delayMs = CONNECT_BATCH_DEFAULT_DELAY_MS,
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
      const connectResult = await createConnectContact(contact, CONNECT_BATCH_MAX_ATTEMPTS);
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
    await wait(delayMs);
  }

  const allProjets = flattenUsersProjectsToProjects(usersWithAdminProjets).map(mapProjetToConnectProjet);
  for (const projet of allProjets) {
    try {
      const connectResult = await createConnectProjet(projet, CONNECT_BATCH_MAX_ATTEMPTS);
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
    await wait(delayMs);
  }

  return {
    success: errors.length === 0,
    errors,
    message: `Synchronisation avec Connect : 
    ${createdContactsCount} contact(s) créé(s) / mis à jour..
    ${createdProjetsCount} projet(s) créés / mis à jour.`,
  };
};
