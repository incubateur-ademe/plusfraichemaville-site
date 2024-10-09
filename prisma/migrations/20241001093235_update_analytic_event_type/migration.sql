-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EventType" ADD VALUE 'AJOUT_FICHE_DIAGNOSTIC';
ALTER TYPE "EventType" ADD VALUE 'CREATE_OR_UPDATE_PROJET';
ALTER TYPE "EventType" ADD VALUE 'DELETE_PROJET';
ALTER TYPE "EventType" ADD VALUE 'LEAVE_PROJET';
ALTER TYPE "EventType" ADD VALUE 'UPDATE_MATURITE';
ALTER TYPE "EventType" ADD VALUE 'UPDATE_USER_ROLE';
ALTER TYPE "EventType" ADD VALUE 'DELETE_USER_FROM_PROJET';
ALTER TYPE "EventType" ADD VALUE 'ACCEPT_INVITATION';
ALTER TYPE "EventType" ADD VALUE 'DECLINE_INVITATION';
ALTER TYPE "EventType" ADD VALUE 'ACCEPT_REQUEST';
