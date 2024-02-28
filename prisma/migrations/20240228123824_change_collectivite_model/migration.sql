/*
  Warnings:

  - You are about to drop the column `siret` on the `collectivite` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code_insee]` on the table `collectivite` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ban_id]` on the table `collectivite` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "collectivite_siret_key";

-- AlterTable
ALTER TABLE "collectivite" DROP COLUMN "siret",
ADD COLUMN     "ban_id" TEXT,
ADD COLUMN     "code_insee" TEXT,
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ALTER COLUMN "id" SET DEFAULT CAST(1000000000 + floor(random() * 9000000000) AS bigint);

-- AlterTable
ALTER TABLE "estimation" ALTER COLUMN "id" SET DEFAULT CAST(1000000000 + floor(random() * 9000000000) AS bigint);

-- AlterTable
ALTER TABLE "projet" ALTER COLUMN "id" SET DEFAULT CAST(1000000000 + floor(random() * 9000000000) AS bigint);

-- CreateIndex
CREATE UNIQUE INDEX "collectivite_code_insee_key" ON "collectivite"("code_insee");

-- CreateIndex
CREATE UNIQUE INDEX "collectivite_ban_id_key" ON "collectivite"("ban_id");
