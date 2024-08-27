"use client";
import "@nlux/themes/nova.css";
import "./agent.color.css";
import { AiChat, AiChatUI } from "@nlux/react";
import { useAiChat } from "./hooks/use-ai-chat";
import clsx from "clsx";
import { PropsWithChildren } from "react";
import { AgentGreeting } from "./agent-greeting";

export const AgentContainer = ({ children }: PropsWithChildren) => {
  const { chatAdapter, aiApi } = useAiChat();

  return (
    <div className={clsx("agent-popover", "fixed bottom-10 right-10 z-[1000] h-[80%] max-h-[30rem] w-96 text-sm")}>
      <AiChat api={aiApi} adapter={chatAdapter} displayOptions={{ themeId: "nova", colorScheme: "light" }}>
        <AiChatUI.Greeting>
          <AgentGreeting />
        </AiChatUI.Greeting>
        {children}
      </AiChat>
    </div>
  );
};
