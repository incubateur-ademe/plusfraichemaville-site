/*
  Warnings:

  - You are about to drop the column `fiche_diagnostic_seen` on the `user_projet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_projet" DROP COLUMN "fiche_diagnostic_seen",
ADD COLUMN     "fiches_diagnostic_seen" INTEGER[];
