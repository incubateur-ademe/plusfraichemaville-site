import clsx from "clsx";
import { trackEvent } from "@/src/helpers/matomo/track-matomo";
import { OPEN_ZEPHYR } from "@/src/helpers/matomo/matomo-tags";
import Image from "next/image";

type AgentButtonProps = {
  controllers: {
    isOpen: boolean;
    toggle: () => void;
  };
};

export const AgentButton = ({ controllers }: AgentButtonProps) => {
  const onClick = () => {
    trackEvent(OPEN_ZEPHYR);
    controllers.toggle();
  };
  return (
    <button
      disabled={controllers.isOpen}
      onClick={onClick}
      className={clsx(
        "fixed right-0 top-36 flex h-14 w-32 items-center gap-3 !bg-pfmv-navy px-3 md:top-80",
        "rounded-l-2xl",
        "z-[900] transition-transform duration-300",
        "translate-x-[84px] hover:translate-x-0",
        "disabled:pointer-events-none disabled:hidden",
      )}
    >
      <Image src="/images/zephyr/question.svg" alt="Agent" width={24} height={24} className="size-6" />
      <span className="text-sm leading-4 text-white">Posez vos questions</span>
    </button>
  );
};
