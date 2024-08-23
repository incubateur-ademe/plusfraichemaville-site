import { Conversation } from "@/services/ragtime/ragtime-types";

export const ragtimeSender = async (newMessage: string, conversationId: string | null): Promise<Conversation> => {
  const response = await fetch(process.env.RAGTIME_CHAT_URL ?? "", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${process.env.RAGTIME_API_KEY}`,
    },
    body: JSON.stringify({
      ...(conversationId && { conversationId }),
      message: newMessage,
      agent: process.env.RAGTIME_MODEL,
    }),
  });
  return (await response.json()) as Conversation;
};
