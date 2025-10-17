/*
  Warnings:

  - The values [autre] on the enum `StatutUser` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatutUser_new" AS ENUM ('pas_trouve', 'pas_maintenant', 'pas_compris', 'sans_pfmv');
ALTER TABLE "User" ALTER COLUMN "statut" TYPE "StatutUser_new" USING ("statut"::text::"StatutUser_new");
ALTER TYPE "StatutUser" RENAME TO "StatutUser_old";
ALTER TYPE "StatutUser_new" RENAME TO "StatutUser";
DROP TYPE "StatutUser_old";
COMMIT;
