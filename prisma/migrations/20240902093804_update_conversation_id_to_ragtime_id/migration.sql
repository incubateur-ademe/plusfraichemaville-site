/*
  Warnings:

  - You are about to drop the column `collectivite_id` on the `agent_conversationnel` table. All the data in the column will be lost.
  - You are about to drop the column `conversationId` on the `agent_conversationnel` table. All the data in the column will be lost.
  - You are about to drop the column `estimation_id` on the `agent_conversationnel` table. All the data in the column will be lost.
  - You are about to drop the column `fiche_diagnostic_id` on the `agent_conversationnel` table. All the data in the column will be lost.
  - You are about to drop the column `fiche_solution_id` on the `agent_conversationnel` table. All the data in the column will be lost.
  - You are about to drop the column `projet_id` on the `agent_conversationnel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ragtimeId]` on the table `agent_conversationnel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ragtimeId` to the `agent_conversationnel` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "agent_conversationnel_conversationId_key";

-- AlterTable
ALTER TABLE "agent_conversationnel" DROP COLUMN "collectivite_id",
DROP COLUMN "conversationId",
DROP COLUMN "estimation_id",
DROP COLUMN "fiche_diagnostic_id",
DROP COLUMN "fiche_solution_id",
DROP COLUMN "projet_id",
ADD COLUMN     "ragtimeId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "agent_conversationnel_ragtimeId_key" ON "agent_conversationnel"("ragtimeId");

-- AddForeignKey
ALTER TABLE "agent_conversationnel" ADD CONSTRAINT "agent_conversationnel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
