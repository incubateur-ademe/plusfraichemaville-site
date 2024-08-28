import { saveConversationAction } from "@/actions/agent-conversationnel/save-conversation-action";
import { sentChatMessageAction } from "@/actions/agent-conversationnel/send-chat-message-action";
import { useAiChatApi, useAsBatchAdapter } from "@nlux/react";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export const useAiChat = () => {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [, saveConversationIdInLocalStorage] = useLocalStorage<string>("conversation-id", "");
  const aiApi = useAiChatApi();

  const chatAdapter = useAsBatchAdapter(async (message: string): Promise<string> => {
    const result = await sentChatMessageAction(message, conversationId);
    if (!conversationId) {
      saveConversationAction(result.conversationId);
      saveConversationIdInLocalStorage(result.conversationId);
      setConversationId(result.conversationId);
    }

    return result.messageResponse;
  });

  return { chatAdapter, aiApi };
};
