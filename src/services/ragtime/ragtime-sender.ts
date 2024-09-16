import { AiConversation } from "@/src/services/ragtime/ragtime-types";
import { ragtimeConfig } from "./config";
import { Result } from "@/src/helpers/result-manager";

export const ragtimeSender = async (
  newMessage: string,
  conversationId: string | null,
): Promise<Result<AiConversation>> =>
  ragtimeConfig<AiConversation>(
    "",
    {
      ...(conversationId && { conversationId }),
      message: newMessage,
    },
    "POST",
  );
