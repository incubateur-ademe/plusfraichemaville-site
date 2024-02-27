/*
  Warnings:

  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL;

-- AlterTable
ALTER TABLE "collectivite" ALTER COLUMN "id" SET DEFAULT CAST(1000000000 + floor(random() * 9000000000) AS bigint);

-- AlterTable
ALTER TABLE "estimation" ALTER COLUMN "id" SET DEFAULT CAST(1000000000 + floor(random() * 9000000000) AS bigint);

-- AlterTable
ALTER TABLE "projet" ALTER COLUMN "id" SET DEFAULT CAST(1000000000 + floor(random() * 9000000000) AS bigint);
