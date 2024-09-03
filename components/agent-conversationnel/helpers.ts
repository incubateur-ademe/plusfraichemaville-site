import { ConversationHistory, RagtimeConversationHistory } from "@/services/ragtime/ragtime-types";

export const sanitizeConversationHistoryFromRagtime = (conversation: RagtimeConversationHistory): ConversationHistory =>
  conversation.messages
    // TODO: parfois le rôle provenant de Ragtime peut-être tool
    .filter(({ role }) => role === "assistant" || role === "user")
    .map((message) => ({
      role: message.role,
      message: message.content,
    }));
