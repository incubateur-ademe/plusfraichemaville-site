-- CreateEnum
CREATE TYPE "RoleProjet" AS ENUM ('ADMIN', 'EDITEUR', 'LECTEUR');

-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('REQUESTED', 'INVITED', 'ACCEPTED', 'DECLINED');

-- CreateEnum
CREATE TYPE "emailType" AS ENUM ('projetInvitation', 'projetRequestAccess');

-- CreateEnum
CREATE TYPE "emailStatus" AS ENUM ('PENDING', 'ERROR', 'SUCCESS');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "discardedInformation" TEXT[];

-- CreateTable
CREATE TABLE "user_projet" (
    "id" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,
    "role" "RoleProjet" NOT NULL,
    "projet_id" INTEGER NOT NULL,
    "user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "invitation_token" TEXT NOT NULL,
    "invitation_status" "InvitationStatus" NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "userId" TEXT,

    CONSTRAINT "user_projet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email" (
    "id" TEXT NOT NULL,
    "destination_address" TEXT NOT NULL,
    "type" "emailType" NOT NULL,
    "sending_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "brevo_id" TEXT,
    "email_status" "emailStatus" NOT NULL,
    "user_projet_id" TEXT,

    CONSTRAINT "email_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_projet_user_id_projet_id_key" ON "user_projet"("user_id", "projet_id");

-- AddForeignKey
ALTER TABLE "user_projet" ADD CONSTRAINT "user_projet_projet_id_fkey" FOREIGN KEY ("projet_id") REFERENCES "projet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_projet" ADD CONSTRAINT "user_projet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_projet" ADD CONSTRAINT "user_projet_deleted_by_fkey" FOREIGN KEY ("deleted_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_projet" ADD CONSTRAINT "user_projet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email" ADD CONSTRAINT "email_user_projet_id_fkey" FOREIGN KEY ("user_projet_id") REFERENCES "user_projet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
