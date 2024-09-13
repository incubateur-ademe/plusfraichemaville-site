import { ResponseRenderer, ResponseRendererProps } from "@nlux/react";
import Markdown from "react-markdown";
import Link from "next/link";
import { sanitizeUrlInMessageFromRagtime } from "@/components/agent-conversationnel/helpers";
import { ChatOpenGraphLink } from "@/components/agent-conversationnel/renderers/chat-open-graph-link";
import { ChatDisplayOptions } from "@/components/agent-conversationnel/hooks/use-ai-chat-controls";

export const AgentResponseRenderer: ResponseRenderer<string> = (
  props: ResponseRendererProps<string>,
  displayOptions: ChatDisplayOptions,
) => {
  const content = props.content.toString();
  return (
    <div className="rounded-2xl rounded-bl-none bg-dsfr-background-contrast-blue-france p-3">
      <Markdown
        className="[&_>_p]:mb-0"
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
        {content}
      </Markdown>
      <ChatOpenGraphLink chatMessage={props.content.toString()} displayOptions={displayOptions} />
    </div>
  );
};
