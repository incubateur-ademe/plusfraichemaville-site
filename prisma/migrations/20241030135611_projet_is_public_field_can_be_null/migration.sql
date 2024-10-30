-- AlterTable
ALTER TABLE "projet" ALTER COLUMN "is_public" DROP NOT NULL,
ALTER COLUMN "is_public" DROP DEFAULT;
