import { ResponseRenderer, ResponseRendererProps } from "@nlux/react";
import Markdown from "react-markdown";
import Link from "next/link";
import { sanitizeUrlInMessageFromRagtime } from "@/src/components/agent-conversationnel/helpers";
import { ChatOpenGraphLink } from "@/src/components/agent-conversationnel/renderers/chat-open-graph-link";
import { ChatDisplayOptions } from "@/src/components/agent-conversationnel/hooks/use-ai-chat-controls";

export const AgentResponseRenderer: ResponseRenderer<string | string[]> = (
  props: ResponseRendererProps<string | string[]>,
  displayOptions: ChatDisplayOptions,
) => {
  const content = props.content[0];
  const messages = typeof content === "string" ? [content] : content;
  return (
    <>
      {messages.map((message, index) => (
        <div key={index} className="rounded-2xl rounded-bl-none bg-dsfr-background-contrast-blue-france p-3">
          <Markdown
            className="agentResponse [&_>_p]:mb-0"
            urlTransform={sanitizeUrlInMessageFromRagtime}
            components={{
              a: ({ href = "", children }) => {
                return href.startsWith("/") ? (
                  <Link href={href} onClick={displayOptions.toggleChat}>
                    {children}
                  </Link>
                ) : (
                  <a href={href} target="_blank" rel="noreferrer">
                    {children}
                  </a>
                );
              },
            }}
          >
            {message}
          </Markdown>
          <ChatOpenGraphLink chatMessage={props.content.toString()} displayOptions={displayOptions} />
        </div>
      ))}
    </>
  );
};
