"use server";

import { ResponseAction } from "../actions-types";
import { ConversationContext } from "@/services/ragtime/ragtime-types";
import { saveConversation } from "@/lib/prisma/prisma-agent-conversationnel-queries";
import { auth } from "@/lib/next-auth/auth";

export const saveConversationAction = async (
  conversationId: string,
  context?: ConversationContext,
): Promise<ResponseAction<{ conversationId: string }>> => {
  const session = await auth();
  const conversation = await saveConversation(conversationId, session?.user.id, context);
  return {
    type: "success",
    conversationId: conversation.conversationId,
  };
};
