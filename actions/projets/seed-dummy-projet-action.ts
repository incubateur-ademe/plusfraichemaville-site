"use server";

import { generateRandomId } from "@/helpers/common";
import { error } from "@/helpers/messages";
import { PFMV_ROUTES } from "@/helpers/routes";
import { auth } from "@/lib/next-auth/auth";
import { prismaClient } from "@/lib/prisma/prismaClient";
import { revalidatePath } from "next/cache";

export const seedDummyProjetAction = async () => {
  const session = await auth();
  if (!session) {
    return { success: false, error: error.UNAUTHENTICATED };
  }

  const collectivite = await prismaClient.collectivite.create({
    data: {
      nom: "Collectivité de Brest",
      id: generateRandomId(),
      code_postal: "75001",
      adresse_info: JSON.stringify({ rue: "8 rue de Bretagne", ville: "Brest" }),
      created_by: session.user.id,
      created_at: new Date(),
    },
  });

  const projet = await prismaClient.projet.createMany({
    data: [
      {
        created_by: session.user.id,
        nom: "Ajout d'une fontaine à eau",
        id: generateRandomId(),
        type_espace: "place",
        adresse: "19 rue du commerce",
        adresse_info: JSON.stringify({ rue: "19 rue du commerce", ville: "Brest" }),
        date_echeance: new Date("2024-12-31T23:59:59Z"),
        fiches_solutions_id: [10, 12, 3],
        fiches_solutions_validated: false,
        collectiviteId: collectivite.id,
      },
      {
        created_by: session.user.id,
        nom: "Changement du sol de la cour",
        id: generateRandomId(),
        type_espace: "ecole",
        adresse: "19 rue du commerce",
        adresse_info: JSON.stringify({ rue: "19 rue du commerce", ville: "Brest" }),
        date_echeance: new Date("2024-12-31T23:59:59Z"),
        fiches_solutions_id: [27, 31],
        fiches_solutions_validated: false,
        collectiviteId: collectivite.id,
      },
      {
        created_by: session.user.id,
        nom: "Plantation d'arbres",
        id: generateRandomId(),
        type_espace: "parc",
        adresse: "19 rue du commerce",
        adresse_info: JSON.stringify({ rue: "19 rue du commerce", ville: "Brest" }),
        date_echeance: new Date("2024-12-31T23:59:59Z"),
        fiches_solutions_id: [],
        fiches_solutions_validated: false,
        collectiviteId: collectivite.id,
      },
    ],
  });

  revalidatePath(PFMV_ROUTES.ESPACE_PROJET_LISTE);

  return { projet, success: true, revalidated: true };
};
