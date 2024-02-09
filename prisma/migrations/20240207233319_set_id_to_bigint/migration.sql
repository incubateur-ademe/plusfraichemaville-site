/*
  Warnings:

  - The primary key for the `collectivite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `projet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `simulation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `utilisateur` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `utilisateur_collectivite` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "collectivite" DROP CONSTRAINT "collectivite_created_by_fkey";

-- DropForeignKey
ALTER TABLE "projet" DROP CONSTRAINT "projet_created_by_fkey";

-- DropForeignKey
ALTER TABLE "simulation" DROP CONSTRAINT "simulation_created_by_fkey";

-- DropForeignKey
ALTER TABLE "simulation" DROP CONSTRAINT "simulation_projet_id_fkey";

-- DropForeignKey
ALTER TABLE "utilisateur_collectivite" DROP CONSTRAINT "utilisateur_collectivite_collectivite_id_fkey";

-- DropForeignKey
ALTER TABLE "utilisateur_collectivite" DROP CONSTRAINT "utilisateur_collectivite_utilisateur_id_fkey";

-- AlterTable
ALTER TABLE "collectivite" DROP CONSTRAINT "collectivite_pkey",
ALTER COLUMN "id" SET DEFAULT CAST(1000000000 + floor(random() * 9000000000) AS bigint),
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ALTER COLUMN "created_by" SET DATA TYPE BIGINT,
ADD CONSTRAINT "collectivite_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "projet" DROP CONSTRAINT "projet_pkey",
ALTER COLUMN "id" SET DEFAULT CAST(1000000000 + floor(random() * 9000000000) AS bigint),
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ALTER COLUMN "created_by" SET DATA TYPE BIGINT,
ADD CONSTRAINT "projet_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "simulation" DROP CONSTRAINT "simulation_pkey",
ALTER COLUMN "id" SET DEFAULT CAST(1000000000 + floor(random() * 9000000000) AS bigint),
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ALTER COLUMN "created_by" SET DATA TYPE BIGINT,
ALTER COLUMN "projet_id" SET DATA TYPE BIGINT,
ADD CONSTRAINT "simulation_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "utilisateur" DROP CONSTRAINT "utilisateur_pkey",
ALTER COLUMN "id" SET DEFAULT CAST(1000000000 + floor(random() * 9000000000) AS bigint),
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ADD CONSTRAINT "utilisateur_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "utilisateur_collectivite" DROP CONSTRAINT "utilisateur_collectivite_pkey",
ALTER COLUMN "utilisateur_id" SET DATA TYPE BIGINT,
ALTER COLUMN "collectivite_id" SET DATA TYPE BIGINT,
ADD CONSTRAINT "utilisateur_collectivite_pkey" PRIMARY KEY ("utilisateur_id", "collectivite_id");

-- AddForeignKey
ALTER TABLE "collectivite" ADD CONSTRAINT "collectivite_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "utilisateur_collectivite" ADD CONSTRAINT "utilisateur_collectivite_utilisateur_id_fkey" FOREIGN KEY ("utilisateur_id") REFERENCES "utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "utilisateur_collectivite" ADD CONSTRAINT "utilisateur_collectivite_collectivite_id_fkey" FOREIGN KEY ("collectivite_id") REFERENCES "collectivite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projet" ADD CONSTRAINT "projet_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "simulation" ADD CONSTRAINT "simulation_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "simulation" ADD CONSTRAINT "simulation_projet_id_fkey" FOREIGN KEY ("projet_id") REFERENCES "projet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
