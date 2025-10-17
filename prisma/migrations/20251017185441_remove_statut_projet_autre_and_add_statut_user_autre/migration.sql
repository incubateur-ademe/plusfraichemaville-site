/*
  Warnings:

  - The values [autre] on the enum `StatutProjet` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatutProjet_new" AS ENUM ('termine', 'en_cours', 'besoin_aide');
ALTER TABLE "projet" ALTER COLUMN "statut" TYPE "StatutProjet_new" USING ("statut"::text::"StatutProjet_new");
ALTER TYPE "StatutProjet" RENAME TO "StatutProjet_old";
ALTER TYPE "StatutProjet_new" RENAME TO "StatutProjet";
DROP TYPE "StatutProjet_old";
COMMIT;

-- AlterEnum
ALTER TYPE "StatutUser" ADD VALUE 'autre';
