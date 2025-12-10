import { prismaClient } from "@/src/lib/prisma/prismaClient";
import { EstimationMateriauxFicheSolution } from "@/src/lib/prisma/prismaCustomTypes";
import { Prisma } from "@/src/generated/prisma/client";

async function migrateEstimationMateriaux() {
  console.log("Starting migration...");

  const estimations = await prismaClient.estimation.findMany({
    where: {
      materiaux: {
        not: Prisma.DbNull,
      },
      deleted_at: null,
    },
  });

  console.log(`Found ${estimations.length} estimations to migrate.`);

  for (const estimation of estimations) {
    const materiaux = estimation.materiaux as unknown as EstimationMateriauxFicheSolution[];

    if (!materiaux || !Array.isArray(materiaux)) {
      console.warn(`Skipping estimation ${estimation.id}: Invalid materiaux format.`);
      continue;
    }

    console.log(`Migrating estimation ${estimation.id}...`);

    await prismaClient.$transaction(async (tx) => {
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
          },
        });

        if (em.estimationMateriaux && em.estimationMateriaux.length > 0) {
          await tx.estimation_materiaux.createMany({
            data: em.estimationMateriaux.map((m) => ({
              estimation_fiche_solution_id: createdEfs.id,
              materiau_id: +m.materiauId,
              quantite: m.quantite,
              cout_investissement_override: m.coutInvestissementOverride ?? null,
              cout_entretien_override: m.coutEntretienOverride ?? null,
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
