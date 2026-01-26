/*
  Warnings:

  - A unique constraint covering the columns `[estimation_fiche_solution_id,materiau_id]` on the table `estimation_materiaux` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "estimation_fiche_solution_estimation_id_idx" ON "estimation_fiche_solution"("estimation_id");

-- CreateIndex
CREATE INDEX "estimation_materiaux_estimation_fiche_solution_id_idx" ON "estimation_materiaux"("estimation_fiche_solution_id");

-- CreateIndex
CREATE UNIQUE INDEX "estimation_materiaux_estimation_fiche_solution_id_materiau__key" ON "estimation_materiaux"("estimation_fiche_solution_id", "materiau_id");
