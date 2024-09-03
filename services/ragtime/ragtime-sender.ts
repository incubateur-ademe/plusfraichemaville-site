import { AiConversation } from "@/services/ragtime/ragtime-types";
import { ragtimeConfig } from "./config";

export const ragtimeSender = async (newMessage: string, conversationId: string | null): Promise<AiConversation> =>
  ragtimeConfig<AiConversation>(
    "",
    {
      ...(conversationId && { conversationId }),
      message: newMessage,
    },
    "POST",
  );
