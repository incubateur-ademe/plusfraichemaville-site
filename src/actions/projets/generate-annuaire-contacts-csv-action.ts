"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { getProjetWithRelationsById } from "@/src/lib/prisma/prismaProjetQueries";
import {
  getAnnuaireContactTypeLabel,
  strapiContactToAnnuaireContact,
  userProjetToAnnuaireContactWithProjet,
} from "@/src/components/annuaire/helpers";
import { RexContactId, AnnuaireContact, StrapiAnnuaireContact } from "@/src/components/annuaire/types";
import { getRetoursExperiencesWithContactsById } from "@/src/lib/strapi/queries/retoursExperienceQueries";
import { escapeCsvField } from "@/src/helpers/csv-utils";

export const generateAnnuaireContactsCsvAction = async (
  projetId: number,
): Promise<ResponseAction<{ csv: string | null; message: string }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED", csv: null };
  }

  try {
    const projet = await getProjetWithRelationsById(projetId);
    const inProgressContacts =
      projet?.sourcingUserProjets?.map((c) => userProjetToAnnuaireContactWithProjet(c.sourcedUserProjet as any)) || [];

    const rexContactIds = projet?.sourcingRex as RexContactId[] | null;
    const uniqueRexContactIds = Array.from(new Set(rexContactIds?.map((r) => r.rexId)));
    const allRex = await Promise.all(
      uniqueRexContactIds.map((rexContactId) => getRetoursExperiencesWithContactsById(rexContactId.toString())),
    );

    const rexContacts = allRex?.flatMap((currentRex) => {
      const currentRexContacts = currentRex?.attributes.contacts as unknown as StrapiAnnuaireContact[];
      if (!currentRexContacts) return [];

      return (
        rexContactIds
          ?.filter((rexContactId) => rexContactId.rexId === currentRex?.id)
          .map((rexContactId) => currentRexContacts.find((contact) => contact.id === rexContactId.contactId))
          .filter((contact): contact is StrapiAnnuaireContact => contact !== undefined)
          .map((contact) => currentRex && strapiContactToAnnuaireContact(contact, currentRex))
          .filter((contact): contact is AnnuaireContact => contact !== null) || []
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
    customCaptureException("Error in generateAnnuaireContactsCsvAction DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR", csv: null };
  }
};

const makeCsv = (contacts: AnnuaireContact[]) => {
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
      getAnnuaireContactTypeLabel(contact.typeContact) || "",
      contact.type === "rex" ? getAnnuaireContactTypeLabel(contact.sousTypeContact, true) || "" : "",
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
