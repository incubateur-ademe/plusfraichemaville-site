import { Conversation } from "@/services/ragtime/ragtime-types";
import { ragtimeConfig } from "./config";

export const ragtimeSender = async (newMessage: string, conversationId: string | null): Promise<Conversation> =>
  ragtimeConfig<Conversation>(
    "",
    {
      ...(conversationId && { conversationId }),
      message: newMessage,
    },
    "POST",
  );
