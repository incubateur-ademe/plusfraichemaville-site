/*
  Warnings:

  - You are about to drop the column `is_viewed` on the `user_projet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_projet" DROP COLUMN "is_viewed",
ADD COLUMN     "last_viewed_at" TIMESTAMP(3),
ADD COLUMN     "nb_views" INTEGER DEFAULT 0;
