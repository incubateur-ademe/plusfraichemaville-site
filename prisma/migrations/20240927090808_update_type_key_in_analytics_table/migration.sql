/*
  Warnings:

  - You are about to drop the column `type` on the `Analytics` table. All the data in the column will be lost.
  - Added the required column `event_type` to the `Analytics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Analytics" DROP COLUMN "type",
ADD COLUMN     "event_type" "EventType" NOT NULL;
