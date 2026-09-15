-- AlterTable
ALTER TABLE "collectivite" DROP COLUMN "adresse_info";

-- AlterTable
ALTER TABLE "estimation" DROP COLUMN "materiaux";

-- AlterTable
ALTER TABLE "projet" DROP COLUMN "adresse_info",
DROP COLUMN "fiches_diagnostic_id",
DROP COLUMN "fiches_solutions_id";
