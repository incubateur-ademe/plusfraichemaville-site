-- CreateEnum
CREATE TYPE "TypeLieuClimadiag" AS ENUM ('commune', 'epci');

-- CreateTable
CREATE TABLE "climadiag" (
    "id" INTEGER NOT NULL,
    "nom" TEXT NOT NULL,
    "type_lieu" "TypeLieuClimadiag" NOT NULL,
    "code_insee" TEXT NOT NULL,
    "code_postal" TEXT NOT NULL,
    "epci_parent_id" INTEGER,
    "jours_tres_chauds_ref" DOUBLE PRECISION NOT NULL,
    "jours_tres_chauds_prevision" JSONB NOT NULL,
    "nuits_chaudes_ref" DOUBLE PRECISION NOT NULL,
    "nuits_chaudes_prevision" JSONB NOT NULL,
    "jours_vdc_ref" DOUBLE PRECISION NOT NULL,
    "jours_vdc_prevision" JSONB NOT NULL,

    CONSTRAINT "climadiag_pkey" PRIMARY KEY ("id")
);
