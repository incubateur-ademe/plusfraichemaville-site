import clsx from "clsx";
import Image from "next/image";
import { trackEvent } from "@/src/helpers/matomo/track-matomo";
import { OPEN_ZEPHYR } from "@/src/helpers/matomo/matomo-tags";

type AgentButtonProps = {
  openChat: () => void;
};

export const AgentButton = ({ openChat }: AgentButtonProps) => {
  const onClick = () => {
    trackEvent(OPEN_ZEPHYR);
    openChat();
  };
  return (
    <button
      onClick={onClick}
      className={clsx(
        "fixed bottom-10 right-10 flex items-center gap-[10px] rounded-2xl bg-white px-3 py-[10px]",
        " z-[900] shadow-[0px_6px_18px_0px_rgba(0,0,18,0.16)]",
      )}
    >
      <Image src={"/images/zephyr/zephyr.png"} width={26} height={26} alt="" />
      <span className="text-base font-bold text-pfmv-navy">Zéphyr</span>
    </button>
  );
};
