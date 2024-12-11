/*
  Warnings:

  - The values [projetCreationRandomRex,projetCreationFixedRex] on the enum `emailType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "emailType_new" AS ENUM ('projetCreation', 'projetInvitation', 'projetRequestAccess', 'projetAccessGranted', 'projetAccessDeclined', 'contactMessageSent', 'welcomeMessage');
ALTER TABLE "email" ALTER COLUMN "type" TYPE "emailType_new" USING ("type"::text::"emailType_new");
ALTER TYPE "emailType" RENAME TO "emailType_old";
ALTER TYPE "emailType_new" RENAME TO "emailType";
DROP TYPE "emailType_old";
COMMIT;
