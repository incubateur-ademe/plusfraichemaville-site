"use server";

import { ResponseAction } from "../actions-types";
import { ragtimeSender } from "@/services/ragtime/ragtime-sender";
import { auth } from "@/lib/next-auth/auth";
import {
  retrieveAnonymousConversation,
  retrieveLoggedConversation,
  saveConversation,
} from "@/lib/prisma/prisma-agent-conversationnel-queries";
import { sanitizeUrlInMessageFromRagtime } from "@/components/agent-conversationnel/helpers";

export const sentChatMessageAction = async (
  userMessage: string,
  conversationId?: string | null,
): Promise<
  ResponseAction<{
    messageResponse?: string;
    conversationId?: string;
  }>
> => {
  let ragtimeId = null;
  const session = await auth();
  let retrievedConversation;
  if (conversationId) {
    const session = await auth();
    const userId = session?.user.id;

    if (userId) {
      retrievedConversation = await retrieveLoggedConversation(conversationId, userId);
    } else {
      retrievedConversation = await retrieveAnonymousConversation(conversationId);
    }
    if (!retrievedConversation) {
      return { type: "error", message: "UNAUTHORIZED" };
    }
    ragtimeId = retrievedConversation?.ragtimeId;
  }

  const ragTimeResult = await ragtimeSender(userMessage, ragtimeId);
  if (!conversationId) {
    retrievedConversation = await saveConversation(ragTimeResult.conversationId, session?.user.id);
  }
  const responseText = ragTimeResult.events.find((event) => event.type === "message");
  return {
    type: "success",
    conversationId: retrievedConversation?.id,
    messageResponse: responseText?.data
      ? sanitizeUrlInMessageFromRagtime(responseText.data)
      : "Je n'ai pu trouver de réponse satisfaisante, pouvez-vous reformuler votre question ?",
  };
};
