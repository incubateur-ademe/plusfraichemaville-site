/*
  Warnings:

  - You are about to drop the column `sourcing_cms` on the `projet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "projet" DROP COLUMN "sourcing_cms",
ADD COLUMN     "sourcing_rex" JSONB;
