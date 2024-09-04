import Link from "next/link";
import Image from "next/image";
import { Case, Conditional } from "@/components/common/conditional-renderer";
// eslint-disable-next-line max-len
import { CHAT_OPEN_GRAPH_CORRESPONDANCES } from "@/components/agent-conversationnel/renderers/chat-open-graph-correspondance";
import { ChatDisplayOptions } from "@/components/agent-conversationnel/hooks/use-ai-chat-controls";

export const ChatOpenGraphLink = ({
  chatMessage,
  displayOptions,
}: {
  chatMessage: string;
  displayOptions: ChatDisplayOptions;
}) => {
  return (
    <Conditional>
      {CHAT_OPEN_GRAPH_CORRESPONDANCES.map((correspondance) => (
        <Case key={correspondance.matchingPattern} condition={chatMessage.includes(correspondance.matchingPattern)}>
          <div className="mt-4">
            <Link href={correspondance.link} onClick={displayOptions.toggleChat}>
              <div>
                <Image
                  width={displayOptions.dimensions.width}
                  height={displayOptions.dimensions.height}
                  src={displayOptions.expanded ? correspondance.landscapeImage : correspondance.portraitImage}
                  alt={correspondance.altImage}
                />
              </div>
            </Link>
          </div>
        </Case>
      ))}
    </Conditional>
  );
};
