/*
  Warnings:

  - You are about to drop the column `created_at` on the `aide` table. All the data in the column will be lost.
  - You are about to drop the column `created_by` on the `aide` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `aide` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_by` on the `aide` table. All the data in the column will be lost.
  - You are about to drop the column `estimationId` on the `aide` table. All the data in the column will be lost.
  - You are about to drop the column `recurrence` on the `aide` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `aide` table. All the data in the column will be lost.
  - You are about to drop the column `subvention_rate_upper_bound` on the `aide` table. All the data in the column will be lost.
  - Added the required column `aideTerritoireId` to the `aide` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "aide" DROP CONSTRAINT "aide_created_by_fkey";

-- DropForeignKey
ALTER TABLE "aide" DROP CONSTRAINT "aide_deleted_by_fkey";

-- DropForeignKey
ALTER TABLE "aide" DROP CONSTRAINT "aide_estimationId_fkey";

-- AlterTable
ALTER TABLE "aide" DROP COLUMN "created_at",
DROP COLUMN "created_by",
DROP COLUMN "deleted_at",
DROP COLUMN "deleted_by",
DROP COLUMN "estimationId",
DROP COLUMN "recurrence",
DROP COLUMN "start_date",
DROP COLUMN "subvention_rate_upper_bound",
ADD COLUMN     "aideTerritoireId" INTEGER NOT NULL,
ADD COLUMN     "userId" TEXT;

-- CreateTable
CREATE TABLE "estimations_aides" (
    "id" INTEGER NOT NULL,
    "estimationId" INTEGER NOT NULL,
    "aideId" INTEGER NOT NULL,

    CONSTRAINT "estimations_aides_pkey" PRIMARY KEY ("estimationId","aideId")
);

-- AddForeignKey
ALTER TABLE "estimations_aides" ADD CONSTRAINT "estimations_aides_estimationId_fkey" FOREIGN KEY ("estimationId") REFERENCES "estimation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimations_aides" ADD CONSTRAINT "estimations_aides_aideId_fkey" FOREIGN KEY ("aideId") REFERENCES "aide"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
