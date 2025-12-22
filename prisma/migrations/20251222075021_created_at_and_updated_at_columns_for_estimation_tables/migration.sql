/*
  Warnings:

  - Added the required column `updated_at` to the `estimation_fiche_solution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `estimation_materiaux` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "estimation_materiaux" DROP CONSTRAINT "estimation_materiaux_estimation_fiche_solution_id_fkey";

-- AlterTable
ALTER TABLE "estimation_fiche_solution" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "estimation_materiaux" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "estimation_materiaux" ADD CONSTRAINT "estimation_materiaux_estimation_fiche_solution_id_fkey" FOREIGN KEY ("estimation_fiche_solution_id") REFERENCES "estimation_fiche_solution"("id") ON DELETE CASCADE ON UPDATE CASCADE;
