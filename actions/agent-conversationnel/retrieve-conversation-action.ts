"use server";

import { ragtimeConversationRetriever } from "@/services/ragtime/ragtime-conversation-retriever";
import { ResponseAction } from "../actions-types";
import { ConversationHistory } from "@/services/ragtime/ragtime-types";

export const retrieveConversationAction = async (
  conversationId: string,
): Promise<
  ResponseAction<{
    conversationHistory: ConversationHistory;
  }>
> => {
  const conversationHistory = await ragtimeConversationRetriever(conversationId);
  return {
    type: "success",
    conversationHistory,
  };
};
