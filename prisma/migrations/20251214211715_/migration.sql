/*
  Warnings:

  - A unique constraint covering the columns `[estimation_id,fiche_solution_id]` on the table `estimation_fiche_solution` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "estimation_fiche_solution_estimation_id_fiche_solution_id_key" ON "estimation_fiche_solution"("estimation_id", "fiche_solution_id");
