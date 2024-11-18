/*
  Warnings:

  - You are about to drop the column `nomEtablissement` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "nomEtablissement",
ADD COLUMN     "nom_etablissement" TEXT;
