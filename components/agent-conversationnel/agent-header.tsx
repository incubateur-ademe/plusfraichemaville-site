import clsx from "clsx";
import Image from "next/image";
import { ConversationControls } from "./hooks/use-ai-chat-config";
import { Case, Conditional } from "../common/conditional-renderer";

type AgentHeaderProps = {
  closeChat: () => void;
  expandChat: () => void;
  conversationControls: ConversationControls;
};

export const AgentHeader = ({
  closeChat,
  expandChat,

  conversationControls,
}: AgentHeaderProps) => {
  return (
    <div
      className={clsx(
        "absolute top-0 z-[9999999] w-full rounded-t-2xl bg-white p-4",
        "border-b-[1px] border-b-dsfr-background-contrast-blue-france-hover",
      )}
    >
      <div className="relative mx-auto flex max-w-3xl justify-between">
        <div>
          <Conditional>
            <Case condition={conversationControls.conversationStarted}>
              <button onClick={conversationControls.resetConversation}>
                <i className="ri-arrow-left-line"></i>
              </button>
            </Case>
            <Case condition={!conversationControls.conversationStarted && conversationControls.hasLastConversation}>
              <button onClick={conversationControls.loadLastConversation}>
                <i className="ri-history-line text-pfmv-navy"></i>
              </button>
            </Case>
          </Conditional>
        </div>
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-[10px]">
          <Image src={"/images/zephyr/zephyr.png"} width={26} height={26} alt="" />
          <span className="text-base font-bold text-pfmv-navy">Zéphyr</span>
        </div>
        <div className="flex items-center gap-4 text-pfmv-navy">
          <button onClick={expandChat}>
            <i className="ri-expand-diagonal-line"></i>
          </button>
          <button onClick={closeChat}>
            <i className="ri-close-line"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
