-- CreateEnum
CREATE TYPE "ReferenceType" AS ENUM ('USER', 'PROJET', 'ESTIMATION');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('AJOUT_FICHE_SOLUTION');

-- CreateTable
CREATE TABLE "Analytics" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "referenced_id" TEXT NOT NULL,
    "referenced_type" "ReferenceType" NOT NULL,
    "type" "EventType" NOT NULL,
    "context" JSONB,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Analytics" ADD CONSTRAINT "Analytics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
