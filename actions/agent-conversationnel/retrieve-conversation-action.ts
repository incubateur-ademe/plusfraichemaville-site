"use server";

import { ResponseAction } from "../actions-types";
import { ConversationHistory } from "@/services/ragtime/ragtime-types";
import { auth } from "@/lib/next-auth/auth";
import {
  retrieveAnonymousConversation,
  retrieveLoggedConversation,
} from "@/lib/prisma/prisma-agent-conversationnel-queries";
import { ragtimeConversationRetriever } from "@/services/ragtime/ragtime-conversation-retriever";
import { sanitizeConversationHistoryFromRagtime } from "@/components/agent-conversationnel/helpers";

export const retrieveConversationAction = async (
  conversationId: string,
): Promise<
  ResponseAction<{
    conversationHistory?: ConversationHistory;
    conversationId: string | null;
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
      return { type: "error", conversationHistory: undefined, conversationId: null, message: result.error };
    }
  } else {
    return { type: "error", conversationHistory: undefined, conversationId: null };
  }
};
