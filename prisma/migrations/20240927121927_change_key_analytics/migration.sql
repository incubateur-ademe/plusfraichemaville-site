/*
  Warnings:

  - You are about to drop the column `referenced_id` on the `Analytics` table. All the data in the column will be lost.
  - You are about to drop the column `referenced_type` on the `Analytics` table. All the data in the column will be lost.
  - Added the required column `reference_id` to the `Analytics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reference_type` to the `Analytics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Analytics" DROP COLUMN "referenced_id",
DROP COLUMN "referenced_type",
ADD COLUMN     "reference_id" TEXT NOT NULL,
ADD COLUMN     "reference_type" "ReferenceType" NOT NULL;
