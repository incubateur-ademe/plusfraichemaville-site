/*
  Warnings:

  - You are about to drop the column `sourcing` on the `projet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "projet" DROP COLUMN "sourcing",
ADD COLUMN     "sourcing_cms" JSONB[];

-- CreateTable
CREATE TABLE "projet_sourcing_projet" (
    "id" SERIAL NOT NULL,
    "projet_id" INTEGER NOT NULL,
    "sourcing_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,

    CONSTRAINT "projet_sourcing_projet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "projet_sourcing_projet_projet_id_sourcing_id_key" ON "projet_sourcing_projet"("projet_id", "sourcing_id");

-- AddForeignKey
ALTER TABLE "projet_sourcing_projet" ADD CONSTRAINT "projet_sourcing_projet_projet_id_fkey" FOREIGN KEY ("projet_id") REFERENCES "projet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
