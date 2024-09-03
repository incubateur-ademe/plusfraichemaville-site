/*
  Warnings:

  - A unique constraint covering the columns `[conversationId]` on the table `agent_conversationnel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "agent_conversationnel_conversationId_key" ON "agent_conversationnel"("conversationId");
