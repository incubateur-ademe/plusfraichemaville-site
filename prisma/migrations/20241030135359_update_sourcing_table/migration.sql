/*
  Warnings:

  - You are about to drop the column `sourcing_id` on the `projet_sourcing_projet` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[projet_id,sourced_projet_id]` on the table `projet_sourcing_projet` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sourced_projet_id` to the `projet_sourcing_projet` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "projet_sourcing_projet_projet_id_sourcing_id_key";

-- AlterTable
ALTER TABLE "projet_sourcing_projet" DROP COLUMN "sourcing_id",
ADD COLUMN     "sourced_projet_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "projet_sourcing_projet_projet_id_sourced_projet_id_key" ON "projet_sourcing_projet"("projet_id", "sourced_projet_id");

-- AddForeignKey
ALTER TABLE "projet_sourcing_projet" ADD CONSTRAINT "projet_sourcing_projet_sourced_projet_id_fkey" FOREIGN KEY ("sourced_projet_id") REFERENCES "projet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projet_sourcing_projet" ADD CONSTRAINT "projet_sourcing_projet_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
