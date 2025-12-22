import { prismaClient } from "@/src/lib/prisma/prismaClient";
import { Prisma } from "@/src/generated/prisma/client";

export type EstimationMateriauxFicheSolutionJson = {
  ficheSolutionId: number;
  estimationMateriaux?: {
    materiauId: string;
    quantite: number;
    coutInvestissementOverride?: number;
    coutEntretienOverride?: number;
  }[];
  coutMinInvestissement: number;
  coutMaxInvestissement: number;
  coutMinEntretien: number;
  coutMaxEntretien: number;
  quantite?: number;
};

async function migrateEstimationMateriaux() {
  console.log("Starting migration...");

  const estimations = await prismaClient.estimation.findMany({
    where: {
      materiaux: {
        not: Prisma.DbNull,
      },
    },
  });

  console.log(`Found ${estimations.length} estimations to migrate.`);

  for (const estimation of estimations) {
    const materiaux = estimation.materiaux as unknown as EstimationMateriauxFicheSolutionJson[];

    if (!materiaux || !Array.isArray(materiaux)) {
      console.warn(`Skipping estimation ${estimation.id}: Invalid materiaux format.`);
      continue;
    }

    console.log(`Migrating estimation ${estimation.id}...`);

    await prismaClient.$transaction(async (tx) => {
      tx.estimation_fiche_solution.deleteMany({ where: { estimation_id: estimation.id } });

      for (const em of materiaux) {
        const createdEfs = await tx.estimation_fiche_solution.create({
          data: {
            estimation_id: estimation.id,
            fiche_solution_id: em.ficheSolutionId,
            cout_min_investissement: em.coutMinInvestissement,
            cout_max_investissement: em.coutMaxInvestissement,
            cout_min_entretien: em.coutMinEntretien,
            cout_max_entretien: em.coutMaxEntretien,
            quantite: em.quantite,
            created_at: estimation.created_at,
            updated_at: estimation.updated_at,
          },
        });

        if (em.estimationMateriaux && em.estimationMateriaux.length > 0) {
          await tx.estimation_materiaux.createMany({
            data: em.estimationMateriaux.map((m) => ({
              estimation_fiche_solution_id: createdEfs.id,
              materiau_id: +m.materiauId,
              quantite: m.quantite,
              created_at: estimation.created_at,
              updated_at: estimation.updated_at,
            })),
          });
        }
      }
    });
  }

  console.log("Migration completed.");
}

migrateEstimationMateriaux()
  .catch((e) => {
    console.error("Migration failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
