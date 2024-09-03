import { ConversationHistory, RagtimeConversationHistory } from "@/services/ragtime/ragtime-types";

export const sanitizeConversationHistoryFromRagtime = (conversation: RagtimeConversationHistory): ConversationHistory =>
  conversation.messages
    // TODO: parfois le rôle provenant de Ragtime peut-être tool
    .filter(({ role, content }) => (role === "assistant" || role === "user") && content)
    .map((message) => ({
      role: message.role,
      message: sanitizeMessageFromRagtime(message.content),
    }));

export const sanitizeMessageFromRagtime = (ragtimeResponseMessage: string): string =>
  ragtimeResponseMessage.replace("https://plusfraichemaville.fr/", "/");
