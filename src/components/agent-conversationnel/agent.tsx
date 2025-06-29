"use client";
import { useAiChatControls } from "./hooks/use-ai-chat-controls";
import { AgentButton } from "./agent-button";
import dynamic from "next/dynamic";
import { AgentDiscussionSkeleton } from "@/src/components/agent-conversationnel/agent-discussion-skeleton";

const LazyAgentDiscussion = dynamic(() => import("./agent-discussion").then((mod) => mod.AgentDiscussion), {
  ssr: false,
  loading: () => <AgentDiscussionSkeleton />,
});

export const Agent = () => {
  const { controllers, displayOptions } = useAiChatControls();

  return (
    <>
      {controllers.isOpen && <LazyAgentDiscussion controllers={controllers} displayOptions={displayOptions} />}
      <AgentButton controllers={controllers} />
    </>
  );
};
