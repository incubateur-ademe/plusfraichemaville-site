import { ConnectContact, ConnectResponse } from "./types";

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
      console.log(`Erreur lors de la création du contact: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la création du contact dans Connect:", error);
  }
};

export const batchSyncConnectContacts = async (
  contacts: ConnectContact[],
): Promise<{
  success: boolean;
  errors: { email: string; error: string }[];
}> => {
  if (process.env.CONNECT_SYNC_ACTIVE !== "true") {
    console.log("La synchronisation avec Connect n'est pas activée sur cet environnement.");
    return {
      success: true,
      errors: [],
    };
  }

  const errors: { email: string; error: string }[] = [];

  for (const contact of contacts) {
    try {
      await createConnectContact(contact);
    } catch (error) {
      if (error instanceof Error) {
        errors.push({ email: contact.email, error: error.message });
      }
    }
  }

  return {
    success: errors.length === 0,
    errors,
  };
};
