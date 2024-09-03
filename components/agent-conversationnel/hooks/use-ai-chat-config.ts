import { retrieveConversationAction } from "@/actions/agent-conversationnel/retrieve-conversation-action";
import { saveConversationAction } from "@/actions/agent-conversationnel/save-conversation-action";
import { sentChatMessageAction } from "@/actions/agent-conversationnel/send-chat-message-action";
import { ConversationHistory } from "@/services/ragtime/ragtime-types";
import { useAiChatApi, useAsBatchAdapter } from "@nlux/react";
import { useCallback, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

const CONVERSATION_ID_KEY = "c-id";

export const useAiChatConfig = () => {
  const [ragtimeId, setRagtimeId] = useState<string | null>(null);
  const [savedConversationId, setSavedConversationId] = useLocalStorage<string>(CONVERSATION_ID_KEY, "");
  const [initialConversation, setInitialConversation] = useState<ConversationHistory | undefined>(undefined);

  const api = useAiChatApi();

  const adapter = useAsBatchAdapter(async (message: string): Promise<string> => {
    const result = await sentChatMessageAction(message, ragtimeId);
    if (!ragtimeId) {
      const savedConversation = await saveConversationAction(result.ragtimeId);
      if (savedConversation.type === "success") {
        setSavedConversationId(savedConversation.conversationId);
      }
      setRagtimeId(result.ragtimeId);
    }
    return result.messageResponse;
  });

  const loadLastConversation = useCallback(async () => {
    if (savedConversationId) {
      const result = await retrieveConversationAction(savedConversationId);
      if (result.type === "success") {
        setRagtimeId(result.ragtimeId);
        setInitialConversation(result.conversationHistory);
      }
    }
  }, [savedConversationId]);

  return { adapter, api, initialConversation, loadLastConversation };
};
