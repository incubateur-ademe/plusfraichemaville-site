/*
  Warnings:

  - You are about to drop the `projet_sourcing_projet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "projet_sourcing_projet" DROP CONSTRAINT "projet_sourcing_projet_created_by_fkey";

-- DropForeignKey
ALTER TABLE "projet_sourcing_projet" DROP CONSTRAINT "projet_sourcing_projet_projet_id_fkey";

-- DropForeignKey
ALTER TABLE "projet_sourcing_projet" DROP CONSTRAINT "projet_sourcing_projet_sourced_projet_id_fkey";

-- DropTable
DROP TABLE "projet_sourcing_projet";

-- CreateTable
CREATE TABLE "projet_sourcing_contact" (
    "id" SERIAL NOT NULL,
    "projet_id" INTEGER NOT NULL,
    "sourced_user_projet_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,

    CONSTRAINT "projet_sourcing_contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "projet_sourcing_contact_projet_id_sourced_user_projet_id_key" ON "projet_sourcing_contact"("projet_id", "sourced_user_projet_id");

-- AddForeignKey
ALTER TABLE "projet_sourcing_contact" ADD CONSTRAINT "projet_sourcing_contact_projet_id_fkey" FOREIGN KEY ("projet_id") REFERENCES "projet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projet_sourcing_contact" ADD CONSTRAINT "projet_sourcing_contact_sourced_user_projet_id_fkey" FOREIGN KEY ("sourced_user_projet_id") REFERENCES "user_projet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projet_sourcing_contact" ADD CONSTRAINT "projet_sourcing_contact_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
