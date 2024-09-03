"use server";

import { ResponseAction } from "../actions-types";
import { ConversationHistory, RagtimeConversationHistory } from "@/services/ragtime/ragtime-types";
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
    ragtimeId: string | null;
  }>
> => {
  const session = await auth();
  const userId = session?.user.id;
  let ragtimeConversationHistory: RagtimeConversationHistory;
  let retrievedConversation;

  if (userId) {
    retrievedConversation = await retrieveLoggedConversation(conversationId, userId);
  } else {
    retrievedConversation = await retrieveAnonymousConversation(conversationId);
  }

  if (retrievedConversation) {
    ragtimeConversationHistory = await ragtimeConversationRetriever(retrievedConversation.ragtimeId);
    const conversationHistory = sanitizeConversationHistoryFromRagtime(ragtimeConversationHistory);

    return {
      type: "success",
      conversationHistory,
      ragtimeId: retrievedConversation.ragtimeId,
    };
  } else {
    return {
      type: "error",
      conversationHistory: undefined,
      ragtimeId: null,
    };
  }
};
