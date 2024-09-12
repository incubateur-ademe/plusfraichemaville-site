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
import { generateRandomId } from "@/helpers/common";

export const sentChatMessageAction = async (
  userMessage: string,
  conversationId?: string | null,
): Promise<
  ResponseAction<{
    messageResponse?: string;
    conversationId?: string;
  }>
> => {
  let ragtimeConversationId = null;
  const session = await auth();
  const userId = session?.user.id;
  let retrievedConversation;
  if (conversationId) {
    if (userId) {
      retrievedConversation = await retrieveLoggedConversation(conversationId, userId);
    } else {
      retrievedConversation = await retrieveAnonymousConversation(conversationId);
    }
    if (!retrievedConversation) {
      return { type: "error", message: "UNAUTHORIZED" };
    }
    ragtimeConversationId = retrievedConversation?.ragtimeId;
  }
  const ragtimeUserId = userId ? userId : `anonymous-${ragtimeConversationId || generateRandomId()}`;
  const ragTimeResult = await ragtimeSender(userMessage, ragtimeUserId, ragtimeConversationId);

  if (ragTimeResult.success) {
    if (!conversationId) {
      retrievedConversation = await saveConversation(ragTimeResult.value.conversationId, session?.user.id);
    }

    const responseText = ragTimeResult.value.events.find((event) => event.type === "message");
    return {
      type: "success",
      conversationId: retrievedConversation?.id,
      messageResponse: responseText?.data
        ? sanitizeUrlInMessageFromRagtime(responseText.data)
        : "Je n'ai pu trouver de réponse satisfaisante, pouvez-vous reformuler votre question ?",
    };
  } else {
    return {
      type: "error",
      conversationId: retrievedConversation?.id,
      messageResponse: ragTimeResult.error,
    };
  }
};
