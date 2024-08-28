"use server";

import { ResponseAction } from "../actions-types";
import { ragtimeSender } from "@/services/ragtime/ragtime-sender";

export const sentChatMessageAction = async (
  userMessage: string,
  conversationId: string | null,
): Promise<
  ResponseAction<{
    messageResponse: string;
    conversationId: string;
  }>
> => {
  const ragTimeResult = await ragtimeSender(userMessage, conversationId);
  const responseText = ragTimeResult.events.find((event) => event.type === "message");
  return {
    type: "success",
    conversationId: ragTimeResult.conversationId,
    messageResponse:
      responseText?.data || "Je n'ai pu trouver de réponse satisfaisante, pouvez-vous reformuler votre question ?",
  };
};
