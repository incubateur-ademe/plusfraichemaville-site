-- DropForeignKey
ALTER TABLE "estimation" DROP CONSTRAINT "estimation_projet_id_fkey";

-- AddForeignKey
ALTER TABLE "estimation" ADD CONSTRAINT "estimation_projet_id_fkey" FOREIGN KEY ("projet_id") REFERENCES "projet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
