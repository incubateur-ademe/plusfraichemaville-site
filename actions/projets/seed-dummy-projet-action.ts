"use server";

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
      code_postal: "75001",
      adresse_info: JSON.stringify({ rue: "8 rue de Bretagne", ville: "Brest" }),
      siret: `${Math.floor(Math.random() * 1000000) + 1}`,
      created_by: session.user.id,
      created_at: new Date(),
    },
  });

  const projet = await prismaClient.projet.createMany({
    data: [
      {
        created_by: session.user.id,
        nom: "Ajout d'une fontaine à eau",
        type_espace: "place",
        adresse: "19 rue du commerce",
        code_postal: "75001",
        adresse_info: JSON.stringify({ rue: "19 rue du commerce", ville: "Brest" }),
        date_echeance: new Date("2024-12-31T23:59:59Z"),
        fiches_solutions_id: [1, 2, 3],
        fiches_solutions_validated: false,
        collectiviteId: collectivite.id,
      },
      {
        created_by: session.user.id,
        nom: "Changement du sol de la cour",
        type_espace: "place",
        adresse: "19 rue du commerce",
        code_postal: "75001",
        adresse_info: JSON.stringify({ rue: "19 rue du commerce", ville: "Brest" }),
        date_echeance: new Date("2024-12-31T23:59:59Z"),
        fiches_solutions_id: [1, 2, 3],
        fiches_solutions_validated: false,
        collectiviteId: collectivite.id,
      },
      {
        created_by: session.user.id,
        nom: "Plantation d'arbres",
        type_espace: "place",
        adresse: "19 rue du commerce",
        code_postal: "75001",
        adresse_info: JSON.stringify({ rue: "19 rue du commerce", ville: "Brest" }),
        date_echeance: new Date("2024-12-31T23:59:59Z"),
        fiches_solutions_id: [1, 2, 3],
        fiches_solutions_validated: false,
        collectiviteId: collectivite.id,
      },
    ],
  });

  revalidatePath(PFMV_ROUTES.LISTE_PROJETS);

  return { projet, success: true, revalidated: true };
};
