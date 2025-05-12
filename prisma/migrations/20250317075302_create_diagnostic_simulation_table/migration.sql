-- CreateTable
CREATE TABLE "diagnostic_simulation" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "projet_id" INTEGER NOT NULL,
    "initial_values" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "diagnostic_simulation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "diagnostic_simulation" ADD CONSTRAINT "diagnostic_simulation_projet_id_fkey" FOREIGN KEY ("projet_id") REFERENCES "projet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnostic_simulation" ADD CONSTRAINT "diagnostic_simulation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
