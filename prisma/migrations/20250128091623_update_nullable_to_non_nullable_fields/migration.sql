/*
  Warnings:

  - Made the column `created_at` on table `projet_fiche` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `projet_fiche` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "projet_fiche" DROP CONSTRAINT "projet_fiche_user_id_fkey";

-- AlterTable
ALTER TABLE "projet_fiche" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "user_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "projet_fiche" ADD CONSTRAINT "projet_fiche_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
