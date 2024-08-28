import { ConversationContext } from "@/services/ragtime/ragtime-types";
import { prismaClient } from "./prismaClient";

export const saveConversation = async (conversationId: string, userId?: string, context?: ConversationContext) => {
  return await prismaClient.agent_conversationnel.create({
    data: {
      conversationId,
      userId: userId ?? null,
      collectivite_id: context?.collectiviteId,
      fiche_diagnostic_id: context?.ficheDiagnosticId,
      fiche_solution_id: context?.ficheSolutionId,
      projet_id: context?.projetId,
      estimation_id: context?.estimationId,
    },
  });
};
