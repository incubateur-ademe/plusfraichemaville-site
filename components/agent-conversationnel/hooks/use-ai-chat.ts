import { sentChatMessageAction } from "@/actions/agentConversationnel/sendChatMessageAction";
import { useAiChatApi, useAsBatchAdapter } from "@nlux/react";
import { useState } from "react";

export const useAiChat = () => {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const aiApi = useAiChatApi();

  const chatAdapter = useAsBatchAdapter(async (message: string): Promise<string> => {
    const result = await sentChatMessageAction(message, conversationId);
    setConversationId(result.conversationId);
    return result.messageResponse;
  });

  return { chatAdapter, aiApi };
};
