"use server";

import { ResponseAction } from "../actions-types";
import { ConversationHistory } from "@/src/services/ragtime/ragtime-types";
import { auth } from "@/src/lib/next-auth/auth";
import {
  retrieveAnonymousConversation,
  retrieveLoggedConversation,
} from "@/src/lib/prisma/prisma-agent-conversationnel-queries";
import { ragtimeConversationRetriever } from "@/src/services/ragtime/ragtime-conversation-retriever";
import { sanitizeConversationHistoryFromRagtime } from "@/src/components/agent-conversationnel/helpers";

export const retrieveConversationAction = async (
  conversationId: string,
): Promise<
  ResponseAction<{
    conversationHistory?: ConversationHistory;
    conversationId?: string | null;
    messageError?: string;
  }>
> => {
  const session = await auth();
  const userId = session?.user.id;

  let retrievedConversation;

  if (userId) {
    retrievedConversation = await retrieveLoggedConversation(conversationId, userId);
  } else {
    retrievedConversation = await retrieveAnonymousConversation(conversationId);
  }

  if (retrievedConversation) {
    const result = await ragtimeConversationRetriever(retrievedConversation.ragtimeId);

    if (result.success) {
      const conversationHistory = sanitizeConversationHistoryFromRagtime(result.value);
      return { type: "success", conversationHistory, conversationId: retrievedConversation.id };
    } else {
      return { type: "error", messageError: result.error };
    }
  } else {
    return { type: "error" };
  }
};
