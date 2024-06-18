-- CreateTable
CREATE TABLE "aide" (
    "id" INTEGER NOT NULL,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "submission_deadline" TEXT,
    "name" TEXT,
    "recurrence" TEXT,
    "subvention_rate_upper_bound" INTEGER,
    "financers" TEXT[],
    "start_date" TEXT,
    "estimationId" INTEGER,

    CONSTRAINT "aide_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "aide" ADD CONSTRAINT "aide_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aide" ADD CONSTRAINT "aide_deleted_by_fkey" FOREIGN KEY ("deleted_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aide" ADD CONSTRAINT "aide_estimationId_fkey" FOREIGN KEY ("estimationId") REFERENCES "estimation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
