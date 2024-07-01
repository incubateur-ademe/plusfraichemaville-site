/*
  Warnings:

  - The `submission_deadline` column on the `aide` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "aide" DROP COLUMN "submission_deadline",
ADD COLUMN     "submission_deadline" DATE;
