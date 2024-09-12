import { ConversationHistory, RagtimeConversationHistory } from "@/services/ragtime/ragtime-types";

export const sanitizeConversationHistoryFromRagtime = (conversation: RagtimeConversationHistory): ConversationHistory =>
  conversation.messages
    .filter(({ role, content }) => (role === "assistant" || role === "user") && content)
    .map((message) => ({
      role: message.role,
      message: message.content,
    }));

export const sanitizeUrlInMessageFromRagtime = (ragtimeResponseMessage: string): string =>
  ragtimeResponseMessage.replace("https://plusfraichemaville.fr/", "/");
