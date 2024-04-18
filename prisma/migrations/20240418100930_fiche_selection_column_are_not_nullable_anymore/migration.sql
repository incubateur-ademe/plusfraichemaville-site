/*
  Warnings:

  - Made the column `selection_fiches_solutions` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
UPDATE "User" SET "selection_fiches_solutions" = '[]' WHERE "selection_fiches_solutions" is null;

UPDATE "User" SET "selection_fiches_diagnostic" = '{}' WHERE "selection_fiches_diagnostic" is null;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "selection_fiches_solutions" SET NOT NULL,
ALTER COLUMN "selection_fiches_solutions" SET DEFAULT '[]',
ALTER COLUMN "selection_fiches_diagnostic" SET DEFAULT ARRAY[]::INTEGER[];
