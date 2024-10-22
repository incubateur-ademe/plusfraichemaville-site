-- CreateTable
CREATE TABLE "SyncLog" (
    "id" TEXT NOT NULL,
    "lastSyncDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SyncLog_pkey" PRIMARY KEY ("id")
);
