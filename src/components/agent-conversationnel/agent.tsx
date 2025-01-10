"use client";
import "@nlux/themes/nova.css";
import "./agent.color.css";
import { AiChat, AiChatUI } from "@nlux/react";
import { useAiChatConfig } from "./hooks/use-ai-chat-config";
import clsx from "clsx";
import { AgentGreeting } from "./agent-greeting";
import { useAiChatControls } from "./hooks/use-ai-chat-controls";
import { AgentButton } from "./agent-button";
import { AgentLoader } from "./agent-loader";
import { AgentResponseRenderer } from "./renderers/agent-renderer-response";
import { AgentPromptRenderer } from "./renderers/agent-renderer-prompt";
import dynamic from "next/dynamic";
import { AgentError } from "./agent-error";

const AgentHeader = dynamic(() => import("./agent-header").then((mod) => mod.AgentHeader), {ssr: false});

export const Agent = () => {
  const { adapter, api, initialConversation, conversationControls, error } = useAiChatConfig();
  const { displayOptions, controllers } = useAiChatControls();
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
              responseRenderer: (props) => AgentResponseRenderer(props, displayOptions),
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
      <AgentButton controllers={controllers} />
    </>
  );
};
