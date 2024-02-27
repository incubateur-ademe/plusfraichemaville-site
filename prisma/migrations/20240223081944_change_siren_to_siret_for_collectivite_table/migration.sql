/*
  Warnings:

  - You are about to drop the column `siren` on the `collectivite` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[siret]` on the table `collectivite` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "collectivite" DROP COLUMN "siren",
ADD COLUMN     "siret" TEXT,
ALTER COLUMN "id" SET DEFAULT CAST(1000000000 + floor(random() * 9000000000) AS bigint);

-- AlterTable
ALTER TABLE "estimation" ALTER COLUMN "id" SET DEFAULT CAST(1000000000 + floor(random() * 9000000000) AS bigint);

-- AlterTable
ALTER TABLE "projet" ALTER COLUMN "id" SET DEFAULT CAST(1000000000 + floor(random() * 9000000000) AS bigint);

-- CreateIndex
CREATE UNIQUE INDEX "collectivite_siret_key" ON "collectivite"("siret");
