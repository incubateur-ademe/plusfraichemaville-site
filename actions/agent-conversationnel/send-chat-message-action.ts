"use server";

import { ResponseAction } from "../actions-types";
import { ragtimeSender } from "@/services/ragtime/ragtime-sender";

export const sentChatMessageAction = async (
  userMessage: string,
  ragtimeId: string | null,
): Promise<
  ResponseAction<{
    messageResponse: string;
    ragtimeId: string;
  }>
> => {
  const ragTimeResult = await ragtimeSender(userMessage, ragtimeId);
  const responseText = ragTimeResult.events.find((event) => event.type === "message");
  return {
    type: "success",
    ragtimeId: ragTimeResult.conversationId,
    messageResponse:
      responseText?.data || "Je n'ai pu trouver de réponse satisfaisante, pouvez-vous reformuler votre question ?",
  };
};
