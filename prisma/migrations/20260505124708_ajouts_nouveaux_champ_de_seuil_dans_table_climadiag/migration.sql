-- AlterTable
ALTER TABLE "climadiag" ADD COLUMN     "seuil_jours_tres_chauds" INTEGER,
ADD COLUMN     "seuil_nuits_chaudes" INTEGER,
ALTER COLUMN "jours_vdc_prevision" DROP NOT NULL;
