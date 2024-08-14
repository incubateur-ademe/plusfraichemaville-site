/*
  Warnings:

  - You are about to drop the column `userId` on the `user_projet` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_projet" DROP CONSTRAINT "user_projet_userId_fkey";

-- AlterTable
ALTER TABLE "user_projet" DROP COLUMN "userId";
