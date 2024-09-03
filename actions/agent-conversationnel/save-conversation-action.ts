"use server";

import { ResponseAction } from "../actions-types";
import { saveConversation } from "@/lib/prisma/prisma-agent-conversationnel-queries";
import { auth } from "@/lib/next-auth/auth";

export const saveConversationAction = async (
  ragtimeId: string,
): Promise<ResponseAction<{ conversationId: string }>> => {
  const session = await auth();
  const conversation = await saveConversation(ragtimeId, session?.user.id);
  return {
    type: "success",
    conversationId: conversation.id,
  };
};
