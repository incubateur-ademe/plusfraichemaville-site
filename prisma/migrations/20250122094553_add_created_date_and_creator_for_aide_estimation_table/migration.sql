-- AlterTable
ALTER TABLE "estimations_aides"
    ADD COLUMN "created_at" TIMESTAMP(3),
    ADD COLUMN "user_id"    TEXT;
ALTER TABLE "estimations_aides"
    ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "estimations_aides"
    ADD CONSTRAINT "estimations_aides_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
