-- CreateEnum
CREATE TYPE "StatutUser" AS ENUM ('pas_trouve', 'pas_maintenant', 'pas_compris', 'sans_pfmv', 'autre');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "statut" "StatutUser",
ADD COLUMN     "statut_updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "projet" ADD COLUMN     "statut_updated_at" TIMESTAMP(3);
