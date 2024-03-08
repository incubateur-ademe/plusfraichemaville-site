/*
  Warnings:

  - You are about to drop the column `cout_max_entretien` on the `estimation` table. All the data in the column will be lost.
  - You are about to drop the column `cout_max_investissement` on the `estimation` table. All the data in the column will be lost.
  - You are about to drop the column `cout_min_entretien` on the `estimation` table. All the data in the column will be lost.
  - You are about to drop the column `cout_min_investissement` on the `estimation` table. All the data in the column will be lost.

*/

-- AlterTable
ALTER TABLE "estimation" DROP COLUMN "cout_max_entretien",
DROP COLUMN "cout_max_investissement",
DROP COLUMN "cout_min_entretien",
DROP COLUMN "cout_min_investissement";
