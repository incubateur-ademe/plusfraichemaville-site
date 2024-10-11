/*
  Warnings:

  - The values [AJOUT_FICHE_SOLUTION,AJOUT_FICHE_DIAGNOSTIC,CREATE_OR_UPDATE_PROJET,DELETE_PROJET,LEAVE_PROJET,UPDATE_USER_ROLE,DELETE_USER_FROM_PROJET,ACCEPT_INVITATION,DECLINE_INVITATION,ACCEPT_REQUEST] on the enum `EventType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `userId` on the `Analytics` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Analytics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EventType_new" AS ENUM ('UPDATE_MATURITE');
ALTER TABLE "Analytics" ALTER COLUMN "event_type" TYPE "EventType_new" USING ("event_type"::text::"EventType_new");
ALTER TYPE "EventType" RENAME TO "EventType_old";
ALTER TYPE "EventType_new" RENAME TO "EventType";
DROP TYPE "EventType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Analytics" DROP CONSTRAINT "Analytics_userId_fkey";

-- AlterTable
ALTER TABLE "Analytics" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Analytics" ADD CONSTRAINT "Analytics_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
