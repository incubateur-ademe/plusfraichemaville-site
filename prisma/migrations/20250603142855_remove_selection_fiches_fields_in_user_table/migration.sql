/*
  Warnings:

  - You are about to drop the column `selection_fiches_diagnostic` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `selection_fiches_solutions` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "selection_fiches_diagnostic",
DROP COLUMN "selection_fiches_solutions";
