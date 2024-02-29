/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `poste` on the `user_collectivite` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "agentconnect_info" JSONB,
ADD COLUMN     "poste" TEXT;

-- AlterTable
ALTER TABLE "collectivite" ALTER COLUMN "id" SET DEFAULT CAST(1000000000 + floor(random() * 9000000000) AS bigint);

-- AlterTable
ALTER TABLE "projet" ALTER COLUMN "id" SET DEFAULT CAST(1000000000 + floor(random() * 9000000000) AS bigint);

-- AlterTable
ALTER TABLE "simulation" ALTER COLUMN "id" SET DEFAULT CAST(1000000000 + floor(random() * 9000000000) AS bigint);

-- AlterTable
ALTER TABLE "user_collectivite" DROP COLUMN "poste";
