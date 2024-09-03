import { retrieveConversationAction } from "@/actions/agent-conversationnel/retrieve-conversation-action";
import { sentChatMessageAction } from "@/actions/agent-conversationnel/send-chat-message-action";
import { ConversationHistory } from "@/services/ragtime/ragtime-types";
import { useAiChatApi, useAsBatchAdapter } from "@nlux/react";
import { useCallback, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

const CONVERSATION_ID_KEY = "c-id";

export const useAiChatConfig = () => {
  const [conversationId, setConversationId] = useState<string | null | undefined>(null);
  const [savedConversationId, setSavedConversationId] = useLocalStorage<string | undefined>(CONVERSATION_ID_KEY, "");
  const [initialConversation, setInitialConversation] = useState<ConversationHistory | undefined>(undefined);

  const api = useAiChatApi();

  const adapter = useAsBatchAdapter(async (message: string): Promise<string> => {
    const result = await sentChatMessageAction(message, conversationId);
    if (result.type === "success") {
      setConversationId(result.conversationId);
      setSavedConversationId(result.conversationId);
    }
    return result.messageResponse || "Une erreur s'est produite, veuillez réessayer.";
  });

  const loadLastConversation = useCallback(async () => {
    if (savedConversationId) {
      const result = await retrieveConversationAction(savedConversationId);
      if (result.type === "success") {
        setConversationId(result.conversationId);
        setInitialConversation(result.conversationHistory);
      }
    }
  }, [savedConversationId]);

  return { adapter, api, initialConversation, loadLastConversation };
};
