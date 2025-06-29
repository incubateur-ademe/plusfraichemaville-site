"use client";
import "@nlux/themes/nova.css";
import "./agent.color.css";
import { AiChat, AiChatUI } from "@nlux/react";
import { useAiChatConfig } from "./hooks/use-ai-chat-config";
import clsx from "clsx";
import { AgentGreeting } from "./agent-greeting";
import { ChatDisplayOptions } from "./hooks/use-ai-chat-controls";
import { AgentLoader } from "./agent-loader";
import { AgentPromptRenderer } from "./renderers/agent-renderer-prompt";
import { AgentError } from "./agent-error";
import { AgentResponseRenderer } from "@/src/components/agent-conversationnel/renderers/agent-renderer-response";
import { AgentHeader } from "@/src/components/agent-conversationnel/agent-header";

type AgentDiscussionProps = {
  controllers: {
    isOpen: boolean;
    toggle: () => void;
    closeChat: () => void;
    expandChat: () => void;
  };
  displayOptions: ChatDisplayOptions;
};

export const AgentDiscussion = ({ controllers, displayOptions }: AgentDiscussionProps) => {
  const { adapter, api, initialConversation, conversationControls, error } = useAiChatConfig();
  const { width, height } = displayOptions.dimensions;

  return (
    <>
      <div
        className={clsx("agent-popover", "fixed z-[1000] bg-white text-sm", displayOptions.containerClassName)}
        style={{ width, height }}
      >
        <AgentHeader controllers={controllers} conversationControls={conversationControls} />
        <div className={clsx("relative mx-auto max-w-3xl")}>
          <AgentError error={error} />
          <AiChat
            api={api}
            adapter={adapter}
            displayOptions={{ height, colorScheme: "light" }}
            className={displayOptions.rootClassName}
            composerOptions={{ placeholder: "Envoyer un message", autoFocus: true }}
            messageOptions={{
              responseRenderer: (props) => AgentResponseRenderer({ ...props, displayOptions }),
              promptRenderer: AgentPromptRenderer,
            }}
            initialConversation={initialConversation}
          >
            <AiChatUI.Loader>
              <AgentLoader />
            </AiChatUI.Loader>
            <AiChatUI.Greeting>
              <AgentGreeting />
            </AiChatUI.Greeting>
          </AiChat>
        </div>
      </div>
    </>
  );
};
