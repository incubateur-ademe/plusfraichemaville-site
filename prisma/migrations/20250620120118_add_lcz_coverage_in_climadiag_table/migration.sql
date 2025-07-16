-- AlterTable
ALTER TABLE "climadiag" ADD COLUMN     "couverture_lcz" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "superficie" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "jours_tres_chauds_ref" DROP NOT NULL,
ALTER COLUMN "nuits_chaudes_ref" DROP NOT NULL,
ALTER COLUMN "jours_vdc_ref" DROP NOT NULL;
