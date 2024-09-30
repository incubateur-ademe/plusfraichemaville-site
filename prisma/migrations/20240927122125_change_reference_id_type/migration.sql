/*
  Warnings:

  - Changed the type of `reference_id` on the `Analytics` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Analytics" DROP COLUMN "reference_id",
ADD COLUMN     "reference_id" INTEGER NOT NULL;
