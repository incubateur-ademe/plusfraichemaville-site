-- CreateTable
CREATE TABLE "agent_conversationnel" (
    "id" SERIAL NOT NULL,
    "userId" TEXT,
    "conversationId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fiche_solution_id" INTEGER,
    "fiche_diagnostic_id" INTEGER,
    "estimation_id" INTEGER,
    "projet_id" INTEGER,
    "collectivite_id" INTEGER,

    CONSTRAINT "agent_conversationnel_pkey" PRIMARY KEY ("id")
);
