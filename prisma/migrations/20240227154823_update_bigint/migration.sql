-- AlterTable
ALTER TABLE "collectivite" ALTER COLUMN "id" SET DEFAULT CAST(10000000 + floor(random() * 90000000) AS int);

-- AlterTable
ALTER TABLE "estimation" ALTER COLUMN "id" SET DEFAULT CAST(10000000 + floor(random() * 90000000) AS int);

-- AlterTable
ALTER TABLE "projet" ALTER COLUMN "id" SET DEFAULT CAST(10000000 + floor(random() * 90000000) AS int);
