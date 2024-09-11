import clsx from "clsx";
import Image from "next/image";

type AgentButtonProps = {
  openChat: () => void;
};

export const AgentButton = ({ openChat }: AgentButtonProps) => {
  return (
    <button
      onClick={openChat}
      className={clsx(
        "fixed bottom-10 right-10 flex items-center gap-[10px] rounded-2xl bg-white px-3 py-[10px]",
        " shadow-[0px_6px_18px_0px_rgba(0,0,18,0.16)] z-[900]",
      )}
    >
      <Image src={"/images/zephyr/zephyr.png"} width={26} height={26} alt="" />
      <span className="text-base font-bold text-pfmv-navy">Zéphyr</span>
    </button>
  );
};
