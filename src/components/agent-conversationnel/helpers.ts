import { ConversationHistory, RagtimeConversationHistory } from "@/src/services/ragtime/ragtime-types";
import { PFMV_ROUTES } from "@/src/helpers/routes";

export const sanitizeConversationHistoryFromRagtime = (conversation: RagtimeConversationHistory): ConversationHistory =>
  conversation.messages
    .filter(({ role, content }) => (role === "assistant" || role === "user") && content)
    .map((message) => ({
      role: message.role,
      message: message.content,
    }));

export const sanitizeUrlInMessageFromRagtime = (ragtimeResponseMessage: string, projetId?: number): string => {
  if (projetId) {
    return ragtimeResponseMessage
      .replace(
        "https://plusfraichemaville.fr/fiches-diagnostic",
        PFMV_ROUTES.ESPACE_PROJET_FICHES_DIAGNOSTIC_PRESTATION_LISTE(projetId),
      )
      .replace("https://plusfraichemaville.fr/fiche-solution", PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS(projetId))
      .replace("https://plusfraichemaville.fr/", "/");
  } else {
    return ragtimeResponseMessage.replace("https://plusfraichemaville.fr/", "/");
  }
};
