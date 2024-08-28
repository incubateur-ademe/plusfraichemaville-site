import { saveConversationAction } from "@/actions/agent-conversationnel/save-conversation-action";
import { sentChatMessageAction } from "@/actions/agent-conversationnel/send-chat-message-action";
import { useAiChatApi, useAsBatchAdapter } from "@nlux/react";
import { useState } from "react";

export const useAiChat = () => {
  const [conversationId, setConversationId] = useState<string | null>(null);

  const aiApi = useAiChatApi();

  const chatAdapter = useAsBatchAdapter(async (message: string): Promise<string> => {
    const result = await sentChatMessageAction(message, conversationId);
    if (!conversationId) {
      saveConversationAction(result.conversationId);
      setConversationId(result.conversationId);
    }

    return result.messageResponse;
  });

  return { chatAdapter, aiApi };
};
