/*
  Warnings:

  - The values [UPDATE_PROJET_SET_VISIBILE,UPDATE_PROJET_SET_INVISIBILE] on the enum `EventType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EventType_new" AS ENUM ('UPDATE_MATURITE', 'UPDATE_PROJET_SET_VISIBLE', 'UPDATE_PROJET_SET_INVISIBLE');
ALTER TABLE "Analytics" ALTER COLUMN "event_type" TYPE "EventType_new" USING ("event_type"::text::"EventType_new");
ALTER TYPE "EventType" RENAME TO "EventType_old";
ALTER TYPE "EventType_new" RENAME TO "EventType";
DROP TYPE "EventType_old";
COMMIT;
