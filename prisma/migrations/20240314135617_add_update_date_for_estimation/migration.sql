/*
  Warnings:

  - You are about to drop the column `status` on the `estimation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "estimation" DROP COLUMN "status",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropEnum
DROP TYPE "StatusEstimation";
