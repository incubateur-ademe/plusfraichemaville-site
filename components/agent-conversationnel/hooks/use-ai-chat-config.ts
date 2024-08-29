import { retrieveConversationAction } from "@/actions/agent-conversationnel/retrieve-conversation-action";
import { saveConversationAction } from "@/actions/agent-conversationnel/save-conversation-action";
import { sentChatMessageAction } from "@/actions/agent-conversationnel/send-chat-message-action";
import { PFMV_ROUTES } from "@/helpers/routes";
import { ConversationHistory } from "@/services/ragtime/ragtime-types";
import { useAiChatApi, useAsBatchAdapter } from "@nlux/react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

const CONVERSATION_ID_KEY = "c-id";

export const useAiChatConfig = () => {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [savedConversationId, setSavedConversationId] = useLocalStorage<string>(CONVERSATION_ID_KEY, "");
  const [initialConversation, setInitialConversation] = useState<ConversationHistory | null>(null);
  const isConnexionPage = usePathname().startsWith(PFMV_ROUTES.CONNEXION);

  const api = useAiChatApi();

  const adapter = useAsBatchAdapter(async (message: string): Promise<string> => {
    const result = await sentChatMessageAction(message, conversationId);
    if (!conversationId) {
      saveConversationAction(result.conversationId);
      setSavedConversationId(result.conversationId);
      setConversationId(result.conversationId);
    }
    return result.messageResponse;
  });

  // TODO: renvoyer cette fonction pour l'utiliser dans un bouton type "restaurer la conversation précédente"
  const loadExistingConversation = useCallback(async () => {
    if (isConnexionPage && savedConversationId) {
      const result = await retrieveConversationAction(savedConversationId);
      if (result.type === "success") {
        setConversationId(savedConversationId);
        setInitialConversation(result.conversationHistory);
      }
    }
  }, [savedConversationId, isConnexionPage]);

  useEffect(() => {
    loadExistingConversation();
  }, [loadExistingConversation]);

  return { adapter, api, loadExistingConversation, initialConversation };
};
