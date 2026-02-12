-- CreateEnum
CREATE TYPE "TypeEpci" AS ENUM ('CC', 'CA', 'CU', 'MET');

-- CreateTable
CREATE TABLE "epci" (
    "id" TEXT NOT NULL,
    "siren" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "code_departement" TEXT NOT NULL,
    "type" "TypeEpci" NOT NULL,
    "population" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "epci_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commune" (
    "id" TEXT NOT NULL,
    "insee" TEXT NOT NULL,
    "siren" TEXT NOT NULL,
    "epci_id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "population" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "commune_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "epci_siren_key" ON "epci"("siren");

-- CreateIndex
CREATE INDEX "epci_code_departement_idx" ON "epci"("code_departement");

-- CreateIndex
CREATE INDEX "epci_nom_idx" ON "epci"("nom");

-- CreateIndex
CREATE INDEX "epci_siren_idx" ON "epci"("siren");

-- CreateIndex
CREATE UNIQUE INDEX "commune_insee_key" ON "commune"("insee");

-- CreateIndex
CREATE UNIQUE INDEX "commune_siren_key" ON "commune"("siren");

-- CreateIndex
CREATE INDEX "commune_epci_id_idx" ON "commune"("epci_id");

-- CreateIndex
CREATE INDEX "commune_nom_idx" ON "commune"("nom");

-- CreateIndex
CREATE INDEX "commune_insee_idx" ON "commune"("insee");

-- CreateIndex
CREATE INDEX "commune_siren_idx" ON "commune"("siren");

-- AddForeignKey
ALTER TABLE "commune" ADD CONSTRAINT "commune_epci_id_fkey" FOREIGN KEY ("epci_id") REFERENCES "epci"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
