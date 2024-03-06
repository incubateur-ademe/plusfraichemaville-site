-- AlterTable
ALTER TABLE "estimation" ALTER COLUMN "cout_min_investissement" DROP NOT NULL,
ALTER COLUMN "cout_max_investissement" DROP NOT NULL,
ALTER COLUMN "cout_min_entretien" DROP NOT NULL,
ALTER COLUMN "cout_max_entretien" DROP NOT NULL;
