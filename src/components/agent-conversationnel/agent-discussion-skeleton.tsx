"use client";
import "@nlux/themes/nova.css";
import "./agent.color.css";
import clsx from "clsx";
import { CHAT_HEIGHT, CHAT_WIDTH } from "./hooks/use-ai-chat-controls";

export const AgentDiscussionSkeleton = () => {
  return (
    <div
      className={clsx("agent-popover", "fixed bottom-10 right-10 z-[1000] block rounded-2xl bg-white")}
      style={{ width: CHAT_WIDTH, height: CHAT_HEIGHT }}
    >
      <div className="mb-5 h-16 animate-pulse  rounded-t-2xl bg-dsfr-contrast-grey"></div>
      <div className="animate-pulse  p-5">
        <div className="mb-4 h-6 w-14 rounded-sm bg-dsfr-contrast-grey"></div>
        <div className="mb-2 h-4 w-full rounded-sm bg-dsfr-contrast-grey"></div>
        <div className="mb-2 h-4 w-full rounded-sm bg-dsfr-contrast-grey"></div>
        <div className="mb-6 h-4 w-full rounded-sm bg-dsfr-contrast-grey"></div>
      </div>
    </div>
  );
};
