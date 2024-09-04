"use client";
import "@nlux/themes/nova.css";
import "./agent.color.css";
import { AiChat, AiChatUI } from "@nlux/react";
import { useAiChatConfig } from "./hooks/use-ai-chat-config";
import clsx from "clsx";
import { PropsWithChildren } from "react";
import { AgentGreeting } from "./agent-greeting";
import { useAiChatControls } from "./hooks/use-ai-chat-controls";
import { AgentButton } from "./agent-button";
import { AgentHeader } from "./agent-header";
import { AgentLoader } from "./agent-loader";
import { AgentResponseRenderer } from "./renderers/agent-renderer-response";
import { AgentPromptRenderer } from "./renderers/agent-renderer-prompt";

export const Agent = ({ children }: PropsWithChildren) => {
  const { adapter, api, initialConversation, loadLastConversation } = useAiChatConfig();
  const { displayOptions, openChat, closeChat, expandChat } = useAiChatControls();
  const { width, height } = displayOptions.dimensions;

  return (
    <>
      <div
        className={clsx("agent-popover", "fixed z-[1000] bg-white text-sm", displayOptions.containerClassName)}
        style={{ width, height }}
      >
        <AgentHeader closeChat={closeChat} expandChat={expandChat} loadLastConversation={loadLastConversation} />
        <div className={clsx("mx-auto max-w-3xl")}>
          <AiChat
            api={api}
            adapter={adapter}
            displayOptions={{ height, colorScheme: "light" }}
            className={displayOptions.rootClassName}
            composerOptions={{ placeholder: "Envoyer un message" }}
            messageOptions={{
              responseRenderer: (props) => AgentResponseRenderer(props, displayOptions),
              promptRenderer: AgentPromptRenderer,
            }}
            initialConversation={initialConversation}
            conversationOptions={{
              conversationStarters: [
                { prompt: "Je veux créer un projet", icon: "/images/zephyr/loupe.svg" },
                { prompt: "Je cherche une solution", icon: "/images/zephyr/plus.svg" },
                { prompt: "Aide à la décision?", icon: "/images/zephyr/etoiles.svg" },
              ],
            }}
          >
            <AiChatUI.Loader>
              <AgentLoader />
            </AiChatUI.Loader>
            <AiChatUI.Greeting>
              <AgentGreeting />
            </AiChatUI.Greeting>
            {children}
          </AiChat>
        </div>
      </div>
      <AgentButton openChat={openChat} />
    </>
  );
};
