/*
  Warnings:

  - You are about to drop the column `code_postal` on the `projet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "collectivite" ALTER COLUMN "id" SET DEFAULT CAST(1000000000 + floor(random() * 9000000000) AS bigint);

-- AlterTable
ALTER TABLE "estimation" ALTER COLUMN "id" SET DEFAULT CAST(1000000000 + floor(random() * 9000000000) AS bigint);

-- AlterTable
ALTER TABLE "projet" DROP COLUMN "code_postal",
ADD COLUMN     "niveau_maturite" TEXT,
ALTER COLUMN "id" SET DEFAULT CAST(1000000000 + floor(random() * 9000000000) AS bigint);
