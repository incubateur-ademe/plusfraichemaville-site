-- CreateEnum
CREATE TYPE "RoleCollectivite" AS ENUM ('ADMIN');

-- CreateEnum
CREATE TYPE "StatusEstimation" AS ENUM ('en_cours', 'validee');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "agentconnect_info" JSONB,
    "nom" TEXT,
    "prenom" TEXT,
    "poste" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "selection_fiches_solutions" JSONB,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "collectivite" (
    "id" INTEGER NOT NULL DEFAULT CAST(10000000 + floor(random() * 90000000) AS int),
    "nom" TEXT NOT NULL,
    "code_insee" TEXT,
    "code_postal" TEXT,
    "adresse_info" JSONB,
    "ban_id" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "collectivite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_collectivite" (
    "user_id" TEXT NOT NULL,
    "collectivite_id" INTEGER NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_collectivite_pkey" PRIMARY KEY ("user_id","collectivite_id")
);

-- CreateTable
CREATE TABLE "projet" (
    "id" INTEGER NOT NULL DEFAULT CAST(10000000 + floor(random() * 90000000) AS int),
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nom" TEXT NOT NULL,
    "type_espace" TEXT,
    "adresse" TEXT,
    "niveau_maturite" TEXT,
    "adresse_info" JSONB,
    "date_echeance" TIMESTAMP(3),
    "fiches_solutions_id" INTEGER[],
    "fiches_solutions_validated" BOOLEAN NOT NULL DEFAULT false,
    "collectiviteId" INTEGER NOT NULL,

    CONSTRAINT "projet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estimation" (
    "id" INTEGER NOT NULL DEFAULT CAST(10000000 + floor(random() * 90000000) AS int),
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projet_id" INTEGER NOT NULL,
    "fiches_solutions_id" INTEGER[],
    "materiaux" JSONB,
    "cout_min_investissement" INTEGER NOT NULL,
    "cout_max_investissement" INTEGER NOT NULL,
    "cout_min_entretien" INTEGER NOT NULL,
    "cout_max_entretien" INTEGER NOT NULL,
    "status" "StatusEstimation" NOT NULL,

    CONSTRAINT "estimation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "collectivite_code_insee_key" ON "collectivite"("code_insee");

-- CreateIndex
CREATE UNIQUE INDEX "collectivite_ban_id_key" ON "collectivite"("ban_id");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collectivite" ADD CONSTRAINT "collectivite_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_collectivite" ADD CONSTRAINT "user_collectivite_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_collectivite" ADD CONSTRAINT "user_collectivite_collectivite_id_fkey" FOREIGN KEY ("collectivite_id") REFERENCES "collectivite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projet" ADD CONSTRAINT "projet_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projet" ADD CONSTRAINT "projet_collectiviteId_fkey" FOREIGN KEY ("collectiviteId") REFERENCES "collectivite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimation" ADD CONSTRAINT "estimation_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimation" ADD CONSTRAINT "estimation_projet_id_fkey" FOREIGN KEY ("projet_id") REFERENCES "projet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
