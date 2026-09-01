-- DropForeignKey
ALTER TABLE "estimations_aides" DROP CONSTRAINT "estimations_aides_aideId_fkey";

-- DropForeignKey
ALTER TABLE "estimations_aides" DROP CONSTRAINT "estimations_aides_estimationId_fkey";

-- DropForeignKey
ALTER TABLE "estimations_aides" DROP CONSTRAINT "estimations_aides_user_id_fkey";

-- DropTable
DROP TABLE "estimations_aides";
