/*
  Warnings:

  - A unique constraint covering the columns `[code_insee]` on the table `climadiag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "climadiag_code_insee_key" ON "climadiag"("code_insee");
