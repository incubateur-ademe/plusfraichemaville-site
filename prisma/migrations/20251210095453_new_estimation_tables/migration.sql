-- CreateTable
CREATE TABLE "estimation_materiaux" (
    "id" TEXT NOT NULL,
    "estimation_fiche_solution_id" TEXT NOT NULL,
    "materiau_id" INTEGER NOT NULL,
    "quantite" INTEGER NOT NULL,
    "cout_investissement_override" INTEGER NOT NULL,
    "cout_entretien_override" INTEGER NOT NULL,

    CONSTRAINT "estimation_materiaux_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estimation_fiche_solution" (
    "id" TEXT NOT NULL,
    "estimation_id" INTEGER NOT NULL,
    "fiche_solution_id" INTEGER NOT NULL,
    "quantite" INTEGER,
    "cout_min_investissement" INTEGER NOT NULL,
    "cout_max_investissement" INTEGER NOT NULL,
    "cout_min_entretien" INTEGER NOT NULL,
    "cout_max_entretien" INTEGER NOT NULL,

    CONSTRAINT "estimation_fiche_solution_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "estimation_materiaux" ADD CONSTRAINT "estimation_materiaux_estimation_fiche_solution_id_fkey" FOREIGN KEY ("estimation_fiche_solution_id") REFERENCES "estimation_fiche_solution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimation_fiche_solution" ADD CONSTRAINT "estimation_fiche_solution_estimation_id_fkey" FOREIGN KEY ("estimation_id") REFERENCES "estimation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
