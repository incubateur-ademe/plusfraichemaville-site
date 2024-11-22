-- AlterTable
ALTER TABLE "projet" ADD COLUMN     "is_public" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sourcing" JSONB;
