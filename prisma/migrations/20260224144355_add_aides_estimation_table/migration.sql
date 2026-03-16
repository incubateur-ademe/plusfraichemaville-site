-- CreateTable
CREATE TABLE "projet_aides" (
    "id" SERIAL NOT NULL,
    "projet_id" INTEGER NOT NULL,
    "aideId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT,

    CONSTRAINT "projet_aides_pkey" PRIMARY KEY ("projet_id","aideId")
);

-- AddForeignKey
ALTER TABLE "projet_aides" ADD CONSTRAINT "projet_aides_projet_id_fkey" FOREIGN KEY ("projet_id") REFERENCES "projet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projet_aides" ADD CONSTRAINT "projet_aides_aideId_fkey" FOREIGN KEY ("aideId") REFERENCES "aide"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projet_aides" ADD CONSTRAINT "projet_aides_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
