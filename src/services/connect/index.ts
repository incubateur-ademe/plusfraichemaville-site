import { ConnectContact, ConnectResponse } from "./types";

const CONNECT_API_BASE_URL =
  process.env.CONNECT_API_BASE_URL || "https://ppd-x-ademe-interne-api.de-c1.eu1.cloudhub.io/api/v1";

export async function createConnectContact(contact: ConnectContact): Promise<ConnectResponse> {
  try {
    const response = await fetch(`${CONNECT_API_BASE_URL}/personnes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });

    if (!response.ok) {
      console.log(`Erreur lors de la création du contact: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la création du contact dans Connect:", error);
  }
}

export async function updateConnectContact(email: string, contact: ConnectContact): Promise<ConnectResponse> {
  try {
    const response = await fetch(`${CONNECT_API_BASE_URL}/personnes/mail/${encodeURIComponent(email)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });

    if (!response.ok) {
      console.log(`Erreur lors de la mise à jour du contact: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la mise à jour du contact dans Connect:", error);
  }
}

export async function batchSyncConnectContacts(contacts: ConnectContact[]): Promise<{
  success: boolean;
}> {
  for (const contact of contacts) {
    try {
      await createConnectContact(contact);
    } catch (error) {
      console.log("Erreur lors de la création du contact dans Connect:", error);
    }
  }

  return {
    success: true,
  };
}
