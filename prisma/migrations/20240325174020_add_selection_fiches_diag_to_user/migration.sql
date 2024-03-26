-- AlterTable
ALTER TABLE "User" ADD COLUMN     "selection_fiches_diagnostic" INTEGER[];

-- AlterTable
ALTER TABLE "projet" ADD COLUMN     "fiches_diagnostic_id" INTEGER[];
