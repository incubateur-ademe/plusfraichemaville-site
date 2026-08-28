-- AlterTable
ALTER TABLE "estimation_fiche_solution" ALTER COLUMN "fiche_solution_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "estimation_materiaux" ALTER COLUMN "materiau_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "projet" ALTER COLUMN "fiches_solutions_id" SET DATA TYPE TEXT[],
ALTER COLUMN "fiches_diagnostic_id" SET DATA TYPE TEXT[];

-- AlterTable
ALTER TABLE "projet_fiche" ALTER COLUMN "fiche_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "user_projet" ALTER COLUMN "aides_fs_unselected" SET DATA TYPE TEXT[],
ALTER COLUMN "fiches_diagnostic_seen" SET DATA TYPE TEXT[],
ALTER COLUMN "annuaire_rex_projet_clicked" SET DATA TYPE TEXT[];
