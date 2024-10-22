/*
  Warnings:

  - You are about to drop the `SyncLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('SYNC_HUBSPOT');

-- DropTable
DROP TABLE "SyncLog";

-- CreateTable
CREATE TABLE "cron_jobs" (
    "id" TEXT NOT NULL,
    "execution_start_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "execution_end_time" TIMESTAMP(3) NOT NULL,
    "job_type" "JobType" NOT NULL,

    CONSTRAINT "cron_jobs_pkey" PRIMARY KEY ("id")
);
