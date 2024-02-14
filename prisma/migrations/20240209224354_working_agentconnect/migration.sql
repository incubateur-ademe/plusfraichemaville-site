/*
  Warnings:

  - You are about to drop the `utilisateur` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `utilisateur_collectivite` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "collectivite" DROP CONSTRAINT "collectivite_created_by_fkey";

-- DropForeignKey
ALTER TABLE "projet" DROP CONSTRAINT "projet_created_by_fkey";

-- DropForeignKey
ALTER TABLE "simulation" DROP CONSTRAINT "simulation_created_by_fkey";

-- DropForeignKey
ALTER TABLE "utilisateur_collectivite" DROP CONSTRAINT "utilisateur_collectivite_collectivite_id_fkey";

-- DropForeignKey
ALTER TABLE "utilisateur_collectivite" DROP CONSTRAINT "utilisateur_collectivite_utilisateur_id_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "nom" TEXT,
ADD COLUMN     "prenom" TEXT;

-- AlterTable
ALTER TABLE "collectivite" ALTER COLUMN "id" SET DEFAULT CAST(1000000000 + floor(random() * 9000000000) AS bigint),
ALTER COLUMN "created_by" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "projet" ALTER COLUMN "id" SET DEFAULT CAST(1000000000 + floor(random() * 9000000000) AS bigint),
ALTER COLUMN "created_by" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "simulation" ALTER COLUMN "id" SET DEFAULT CAST(1000000000 + floor(random() * 9000000000) AS bigint),
ALTER COLUMN "created_by" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "utilisateur";

-- DropTable
DROP TABLE "utilisateur_collectivite";

-- CreateTable
CREATE TABLE "user_collectivite" (
    "user_id" TEXT NOT NULL,
    "collectivite_id" BIGINT NOT NULL,
    "poste" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_collectivite_pkey" PRIMARY KEY ("user_id","collectivite_id")
);

-- AddForeignKey
ALTER TABLE "collectivite" ADD CONSTRAINT "collectivite_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_collectivite" ADD CONSTRAINT "user_collectivite_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_collectivite" ADD CONSTRAINT "user_collectivite_collectivite_id_fkey" FOREIGN KEY ("collectivite_id") REFERENCES "collectivite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projet" ADD CONSTRAINT "projet_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "simulation" ADD CONSTRAINT "simulation_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
