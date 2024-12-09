"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { getProjetWithRelationsById } from "@/src/lib/prisma/prismaProjetQueries";
import {
  getSourcingContactTypeLabel,
  strapiContactToSourcingContact,
  userProjetToSourcingContactWithProjet,
} from "@/src/components/sourcing/helpers";
import { RexContactId, SourcingContact, StrapiSourcingContact } from "@/src/components/sourcing/types";
import { getRetoursExperiencesWithContactsById } from "@/src/lib/strapi/queries/retoursExperienceQueries";
import { escapeCsvField } from "@/src/helpers/csv-utils";

export const generateSourcingContactsCsvAction = async (
  projetId: number,
): Promise<ResponseAction<{ csv: string | null; message: string }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED", csv: null };
  }

  try {
    const projet = await getProjetWithRelationsById(projetId);
    const inProgressContacts =
      projet?.sourcing_user_projets?.map((c) => userProjetToSourcingContactWithProjet(c.sourced_user_projet)) || [];

    const rexContactIds = projet?.sourcing_rex as RexContactId[] | null;
    const uniqueRexContactIds = Array.from(new Set(rexContactIds?.map((r) => r.rexId)));
    const allRex = await Promise.all(
      uniqueRexContactIds.map((rexContactId) => getRetoursExperiencesWithContactsById(rexContactId.toString())),
    );

    const rexContacts = allRex?.flatMap((currentRex) => {
      const currentRexContacts = currentRex?.attributes.contacts as unknown as StrapiSourcingContact[];
      if (!currentRexContacts) return [];

      return (
        rexContactIds
          ?.filter((rexContactId) => rexContactId.rexId === currentRex?.id)
          .map((rexContactId) => currentRexContacts.find((contact) => contact.id === rexContactId.contactId))
          .filter((contact): contact is StrapiSourcingContact => contact !== undefined)
          .map((contact) => currentRex && strapiContactToSourcingContact(contact, currentRex))
          .filter((contact): contact is SourcingContact => contact !== null) || []
      );
    });

    const allContacts = [...inProgressContacts, ...rexContacts];

    const csv = allContacts && makeCsv(allContacts);

    return {
      type: "success",
      message: "CSV_GENERATED",
      csv,
    };
  } catch (e) {
    customCaptureException("Error in generateSourcingContactsCsvAction DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR", csv: null };
  }
};

const makeCsv = (contacts: SourcingContact[]) => {
  const headersFields = [
    "Type de contact",
    "Sous-type de contact",
    "Entreprise",
    "Email",
    "Téléphone",
    "Site internet",
    "Nom du projet",
    "Région",
    "Poste",
  ].join(",");

  const csvRows = contacts.map((contact) => {
    const specificFields =
      contact.type === "rex"
        ? [contact.rex?.nom || "", contact.rex?.region || ""]
        : [contact.projet?.nom || "", contact.projet?.region || "", contact.poste || ""];

    const fields = [
      getSourcingContactTypeLabel(contact.typeContact) || "",
      contact.type === "rex" ? getSourcingContactTypeLabel(contact.sousTypeContact, true) || "" : "",
      contact.label || "",
      contact.email || "",
      contact.telephone || "",
      contact.siteInternet || "",
      ...specificFields,
    ];

    return fields.map(escapeCsvField).join(",");
  });

  return csvRows && [headersFields, ...csvRows].join("\n");
};
