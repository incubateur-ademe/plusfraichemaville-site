import { ResponseRendererProps } from "@nlux/react";
import Markdown from "react-markdown";
import Link from "next/link";
import { sanitizeUrlInMessageFromRagtime } from "@/src/components/agent-conversationnel/helpers";
import { ChatOpenGraphLink } from "@/src/components/agent-conversationnel/renderers/chat-open-graph-link";
import { ChatDisplayOptions } from "@/src/components/agent-conversationnel/hooks/use-ai-chat-controls";
import { useProjetsStore } from "@/src/stores/projets/provider";

export const AgentResponseRenderer = (
  props: ResponseRendererProps<string | string[]> & { displayOptions: ChatDisplayOptions },
) => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const content = props.content[0];
  const messages = typeof content === "string" ? [content] : content;
  return (
    <>
      {messages.map((message, index) => (
        <div key={index} className="rounded-2xl rounded-bl-none bg-dsfr-background-contrast-blue-france p-3">
          <Markdown
            className="agentResponse [&_>_p]:mb-0"
            urlTransform={(text) => sanitizeUrlInMessageFromRagtime(text, projet?.id)}
            components={{
              a: ({ href = "", children }) => {
                return href.startsWith("/") ? (
                  <Link href={href} onClick={props.displayOptions.toggleChat}>
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
          <ChatOpenGraphLink chatMessage={props.content.toString()} displayOptions={props.displayOptions} />
        </div>
      ))}
    </>
  );
};
