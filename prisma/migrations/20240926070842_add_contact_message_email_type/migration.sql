-- AlterEnum
ALTER TYPE "emailType" ADD VALUE 'contactMessageSent';

-- AlterTable
ALTER TABLE "email" ADD COLUMN     "extra" JSONB;
