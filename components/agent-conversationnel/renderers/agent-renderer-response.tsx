import { ResponseRenderer } from "@nlux/react";

export const AgentResponseRenderer: ResponseRenderer<string> = (props) => {
  return <div className="rounded-2xl rounded-bl-none bg-dsfr-background-contrast-blue-france p-3">{props.content}</div>;
};
