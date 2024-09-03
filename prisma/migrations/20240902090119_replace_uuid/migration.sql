/*
  Warnings:

  - The primary key for the `agent_conversationnel` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "agent_conversationnel" DROP CONSTRAINT "agent_conversationnel_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "agent_conversationnel_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "agent_conversationnel_id_seq";
