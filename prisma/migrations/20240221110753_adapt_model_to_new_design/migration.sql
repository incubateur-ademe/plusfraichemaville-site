/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `poste` on the `user_collectivite` table. All the data in the column will be lost.
  - You are about to drop the `simulation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `collectiviteId` to the `projet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusEstimation" AS ENUM ('en_cours', 'validee');

-- DropForeignKey
ALTER TABLE "simulation" DROP CONSTRAINT "simulation_created_by_fkey";

-- DropForeignKey
ALTER TABLE "simulation" DROP CONSTRAINT "simulation_projet_id_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "agentconnect_info" JSONB,
ADD COLUMN     "poste" TEXT,
ADD COLUMN     "selection_fiches_solutions" JSONB;

-- AlterTable
ALTER TABLE "collectivite" ALTER COLUMN "id" SET DEFAULT CAST(1000000000 + floor(random() * 9000000000) AS bigint);

-- AlterTable
ALTER TABLE "projet" ADD COLUMN     "collectiviteId" BIGINT NOT NULL,
ADD COLUMN     "fiches_solutions_validated" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "id" SET DEFAULT CAST(1000000000 + floor(random() * 9000000000) AS bigint);

-- AlterTable
ALTER TABLE "user_collectivite" DROP COLUMN "poste",
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "simulation";

-- CreateTable
CREATE TABLE "estimation" (
    "id" BIGINT NOT NULL DEFAULT CAST(1000000000 + floor(random() * 9000000000) AS bigint),
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projet_id" BIGINT NOT NULL,
    "fiches_solutions_id" INTEGER[],
    "materiaux" JSONB,
    "cout_min_investissement" INTEGER NOT NULL,
    "cout_max_investissement" INTEGER NOT NULL,
    "cout_min_entretien" INTEGER NOT NULL,
    "cout_max_entretien" INTEGER NOT NULL,
    "status" "StatusEstimation" NOT NULL,

    CONSTRAINT "estimation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "projet" ADD CONSTRAINT "projet_collectiviteId_fkey" FOREIGN KEY ("collectiviteId") REFERENCES "collectivite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimation" ADD CONSTRAINT "estimation_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimation" ADD CONSTRAINT "estimation_projet_id_fkey" FOREIGN KEY ("projet_id") REFERENCES "projet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
