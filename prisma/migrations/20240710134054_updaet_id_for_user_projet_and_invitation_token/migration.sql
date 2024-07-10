/*
  Warnings:

  - The `user_projet_id` column on the `email` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `user_projet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `user_projet` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "email" DROP CONSTRAINT "email_user_projet_id_fkey";

-- AlterTable
ALTER TABLE "email" DROP COLUMN "user_projet_id",
ADD COLUMN     "user_projet_id" INTEGER;

-- AlterTable
ALTER TABLE "user_projet" DROP CONSTRAINT "user_projet_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "invitation_token" DROP NOT NULL,
ADD CONSTRAINT "user_projet_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "email" ADD CONSTRAINT "email_user_projet_id_fkey" FOREIGN KEY ("user_projet_id") REFERENCES "user_projet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
