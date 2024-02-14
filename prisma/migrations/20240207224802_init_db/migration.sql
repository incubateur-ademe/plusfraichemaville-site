-- CreateEnum
CREATE TYPE "RoleCollectivite" AS ENUM ('ADMIN');

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
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "utilisateur" (
    "id" INTEGER NOT NULL DEFAULT CAST(1000000000 + floor(random() * 9000000000) AS bigint),
    "nom" TEXT,
    "prenom" TEXT,
    "email" TEXT,
    "agent_connect_id" TEXT NOT NULL,
    "agent_connect_info" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "utilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collectivite" (
    "id" INTEGER NOT NULL DEFAULT CAST(1000000000 + floor(random() * 9000000000) AS bigint),
    "nom" TEXT NOT NULL,
    "code_postal" TEXT,
    "adresse_info" JSONB,
    "siren" TEXT,
    "created_by" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "collectivite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "utilisateur_collectivite" (
    "utilisateur_id" INTEGER NOT NULL,
    "collectivite_id" INTEGER NOT NULL,
    "poste" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "utilisateur_collectivite_pkey" PRIMARY KEY ("utilisateur_id","collectivite_id")
);

-- CreateTable
CREATE TABLE "projet" (
    "id" INTEGER NOT NULL DEFAULT CAST(1000000000 + floor(random() * 9000000000) AS bigint),
    "created_by" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nom" TEXT NOT NULL,
    "type_espace" TEXT,
    "adresse" TEXT,
    "code_postal" TEXT,
    "adresse_info" JSONB,
    "date_echeance" TIMESTAMP(3),
    "fiches_solutions_id" INTEGER[],

    CONSTRAINT "projet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "simulation" (
    "id" INTEGER NOT NULL DEFAULT CAST(1000000000 + floor(random() * 9000000000) AS bigint),
    "created_by" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projet_id" INTEGER NOT NULL,
    "fiches_solutions_id" INTEGER[],
    "materiaux" JSONB,
    "cout_min_investissement" INTEGER NOT NULL,
    "cout_max_investissement" INTEGER NOT NULL,
    "cout_min_entretien" INTEGER NOT NULL,
    "cout_max_entretien" INTEGER NOT NULL,

    CONSTRAINT "simulation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
