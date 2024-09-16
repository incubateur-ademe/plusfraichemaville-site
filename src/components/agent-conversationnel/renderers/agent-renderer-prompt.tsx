import { PromptRenderer } from "@nlux/react";

export const AgentPromptRenderer: PromptRenderer = (props) => {
  return <div className="ml-auto rounded-2xl rounded-br-none bg-pfmv-navy p-3">{props.prompt}</div>;
};
