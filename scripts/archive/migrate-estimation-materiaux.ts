import { prismaClient } from "@/src/lib/prisma/prismaClient";
import { getFicheSolutionByIdsComplete } from "@/src/lib/strapi/queries/fichesSolutionsQueries";
import { isEmpty } from "@/src/helpers/listUtils";

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

  const estimations = await prismaClient.estimation.findMany();

  console.log(`Found ${estimations.length} estimations to migrate.`);

  for (const estimation of estimations) {
    const estimationFichesSolution = (estimation.materiaux || []) as unknown as EstimationMateriauxFicheSolutionJson[];
    // @ts-expect-error the fiches_solutions_id column has been removed since this script was executed.
    const fichesSolutionIds = estimation.fiches_solutions_id as number[];

    if (!estimationFichesSolution || !Array.isArray(estimationFichesSolution)) {
      console.warn(`Skipping estimation ${estimation.id}: Invalid materiaux format.`);
      continue;
    }

    console.log(`Migrating estimation ${estimation.id}...`);

    await prismaClient.$transaction(async (tx) => {
      await tx.estimation_fiche_solution.deleteMany({ where: { estimation_id: estimation.id } });

      for (const ficheSolutionId of fichesSolutionIds) {
        const createdEfs = await tx.estimation_fiche_solution.create({
          data: {
            estimation_id: estimation.id,
            fiche_solution_id: ficheSolutionId,
            cout_min_investissement: 0,
            cout_max_investissement: 0,
            cout_min_entretien: 0,
            cout_max_entretien: 0,
            created_at: estimation.created_at,
            updated_at: estimation.updated_at,
          },
        });
        const ficheSolutionCms = await getFicheSolutionByIdsComplete([ficheSolutionId]);

        if (ficheSolutionCms[0] && !isEmpty(ficheSolutionCms[0].attributes.materiaux?.data)) {
          await tx.estimation_materiaux.createMany({
            data:
              ficheSolutionCms[0].attributes.materiaux?.data.map((m) => ({
                estimation_fiche_solution_id: createdEfs.id,
                materiau_id: +m.id,
                quantite: 0,
                created_at: estimation.created_at,
                updated_at: estimation.updated_at,
              })) || [],
          });
        }
      }

      for (const efs of estimationFichesSolution) {
        const createdEfs = await tx.estimation_fiche_solution.upsert({
          where: {
            estimation_id_fiche_solution_id: { estimation_id: estimation.id, fiche_solution_id: efs.ficheSolutionId },
          },
          create: {
            estimation_id: estimation.id,
            fiche_solution_id: efs.ficheSolutionId,
            cout_min_investissement: efs.coutMinInvestissement,
            cout_max_investissement: efs.coutMaxInvestissement,
            cout_min_entretien: efs.coutMinEntretien,
            cout_max_entretien: efs.coutMaxEntretien,
            quantite: efs.quantite,
          },
          update: {},
        });

        if (efs.estimationMateriaux && efs.estimationMateriaux.length > 0) {
          for (const em of efs.estimationMateriaux) {
            await tx.estimation_materiaux.update({
              where: {
                estimation_fiche_solution_id_materiau_id: {
                  estimation_fiche_solution_id: createdEfs.id,
                  materiau_id: +em.materiauId,
                },
              },
              data: {
                quantite: em.quantite,
              },
            });
          }
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
