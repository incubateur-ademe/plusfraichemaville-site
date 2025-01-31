-- CreateEnum
CREATE TYPE "FicheType" AS ENUM ('DIAGNOSTIC', 'SOLUTION');

-- CreateTable
CREATE TABLE "projet_fiche" (
    "id" SERIAL NOT NULL,
    "projet_id" INTEGER NOT NULL,
    "fiche_id" INTEGER NOT NULL,
    "type" "FicheType" NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT,

    CONSTRAINT "projet_fiche_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "projet_fiche_projet_id_fiche_id_type_key" ON "projet_fiche"("projet_id", "fiche_id", "type");

-- AddForeignKey
ALTER TABLE "projet_fiche" ADD CONSTRAINT "projet_fiche_projet_id_fkey" FOREIGN KEY ("projet_id") REFERENCES "projet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projet_fiche" ADD CONSTRAINT "projet_fiche_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
