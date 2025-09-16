/*
  Warnings:

  - Added the required column `searchable_field` to the `climadiag` table without a default value. This is not possible if the table is not empty.

*/
-- Add unaccent extension
set search_path = pfmv, public;

CREATE EXTENSION IF NOT EXISTS unaccent;

-- AlterTable
ALTER TABLE "climadiag"
    ADD COLUMN "searchable_field" TEXT;

update "climadiag"
set "searchable_field" = lower(nom) || ' ' || code_postal || ' ' || code_insee;

ALTER TABLE "climadiag"
    ALTER COLUMN "searchable_field" SET NOT NULL;

-- CreateIndex
CREATE INDEX "climadiag_searchable_field_idx" ON "climadiag" ("searchable_field");
