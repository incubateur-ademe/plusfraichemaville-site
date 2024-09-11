import { AiConversation } from "@/services/ragtime/ragtime-types";
import { ragtimeConfig } from "./config";
import { Result } from "@/helpers/result-manager";

export const ragtimeSender = async (
  newMessage: string,
  userId: string,
  conversationId: string | null,
): Promise<Result<AiConversation>> =>
  ragtimeConfig<AiConversation>(
    "",
    {
      ...(conversationId && { conversationId }),
      message: newMessage,
      anonUser: {
        userId,
      },
    },
    "POST",
  );
