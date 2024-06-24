/*
  Warnings:

  - A unique constraint covering the columns `[aideTerritoireId]` on the table `aide` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
CREATE SEQUENCE aide_id_seq;
ALTER TABLE "aide" ALTER COLUMN "id" SET DEFAULT nextval('aide_id_seq');
ALTER SEQUENCE aide_id_seq OWNED BY "aide"."id";

-- CreateIndex
CREATE UNIQUE INDEX "aide_aideTerritoireId_key" ON "aide"("aideTerritoireId");
