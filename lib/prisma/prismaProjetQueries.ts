import { prismaClient } from "@/lib/prisma/prismaClient";
import { projet } from "@prisma/client";

export const getProjetById = async (projetId: number): Promise<projet | null> => {
  return prismaClient.projet.findUnique({
    where: {
      id: projetId,
    },
  });
};

export const createOrUpdateProjet = async ({
  projetId,
  nomProjet,
  adresse,
  dateEcheance,
  typeEspace,
  niveauMaturite,
  userId,
  collectiviteId,
}: {
  projetId?: number;
  nomProjet: string;
  typeEspace: string;
  adresse?: string;
  dateEcheance: string;
  niveauMaturite: string;
  userId: string;
  collectiviteId: number;
}) => {
  return prismaClient.projet.upsert({
    where: {
      id: projetId ?? -1,
    },
    create: {
      nom: nomProjet,
      type_espace: typeEspace,
      adresse,
      niveau_maturite: niveauMaturite,
      date_echeance: new Date(dateEcheance),
      collectiviteId: collectiviteId,
      created_by: userId,
    },
    update: {
      nom: nomProjet,
      type_espace: typeEspace,
      adresse,
      niveau_maturite: niveauMaturite,
      date_echeance: new Date(dateEcheance),
    },
    include: {
      collectivite: { select: { nom: true } },
    },
  });
};
