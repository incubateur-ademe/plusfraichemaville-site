/*
  Warnings:

  - The primary key for the `collectivite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `collectivite` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `estimation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `estimation` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `projet_id` on the `estimation` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `projet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `projet` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `collectiviteId` on the `projet` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `user_collectivite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `collectivite_id` on the `user_collectivite` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- DropForeignKey
ALTER TABLE "estimation" DROP CONSTRAINT "estimation_projet_id_fkey";

-- DropForeignKey
ALTER TABLE "projet" DROP CONSTRAINT "projet_collectiviteId_fkey";

-- DropForeignKey
ALTER TABLE "user_collectivite" DROP CONSTRAINT "user_collectivite_collectivite_id_fkey";

-- AlterTable
ALTER TABLE "collectivite" DROP CONSTRAINT "collectivite_pkey",
ALTER COLUMN "id" SET DEFAULT CAST(10000000 + floor(random() * 90000000) AS int),
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ADD CONSTRAINT "collectivite_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "estimation" DROP CONSTRAINT "estimation_pkey",
ALTER COLUMN "id" SET DEFAULT CAST(10000000 + floor(random() * 90000000) AS int),
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ALTER COLUMN "projet_id" SET DATA TYPE INTEGER,
ADD CONSTRAINT "estimation_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "projet" DROP CONSTRAINT "projet_pkey",
ALTER COLUMN "id" SET DEFAULT CAST(10000000 + floor(random() * 90000000) AS int),
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ALTER COLUMN "collectiviteId" SET DATA TYPE INTEGER,
ADD CONSTRAINT "projet_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user_collectivite" DROP CONSTRAINT "user_collectivite_pkey",
ALTER COLUMN "collectivite_id" SET DATA TYPE INTEGER,
ADD CONSTRAINT "user_collectivite_pkey" PRIMARY KEY ("user_id", "collectivite_id");

-- AddForeignKey
ALTER TABLE "user_collectivite" ADD CONSTRAINT "user_collectivite_collectivite_id_fkey" FOREIGN KEY ("collectivite_id") REFERENCES "collectivite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projet" ADD CONSTRAINT "projet_collectiviteId_fkey" FOREIGN KEY ("collectiviteId") REFERENCES "collectivite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimation" ADD CONSTRAINT "estimation_projet_id_fkey" FOREIGN KEY ("projet_id") REFERENCES "projet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
