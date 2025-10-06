-- CreateEnum
CREATE TYPE "StatutProjet" AS ENUM ('termine', 'en_cours', 'besoin_aide', 'autre');

-- AlterTable
ALTER TABLE "projet" ADD COLUMN     "statut" "StatutProjet";
