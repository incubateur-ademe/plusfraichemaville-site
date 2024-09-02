import clsx from "clsx";
import Image from "next/image";

type AgentHeaderProps = {
  closeChat: () => void;
  expandChat: () => void;
  loadExistingConversation: () => void;
};

export const AgentHeader = ({ closeChat, expandChat, loadExistingConversation }: AgentHeaderProps) => {
  return (
    <div
      className={clsx(
        "absolute top-0 z-[9999999] w-full rounded-t-2xl bg-white p-4",
        "border-b-[1px] border-b-dsfr-background-contrast-blue-france-hover",
      )}
    >
      <div className="mx-auto flex max-w-3xl justify-between">
        <div className="flex items-center gap-[10px]">
          <Image src={"/images/zephyr/zephyr.png"} width={26} height={26} alt="" />
          <span className="text-base font-bold text-pfmv-navy">Zéphyr</span>
        </div>
        <div className="flex items-center gap-6 text-pfmv-navy">
          <button onClick={loadExistingConversation}>
            <i className="ri-history-line"></i>
          </button>
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
