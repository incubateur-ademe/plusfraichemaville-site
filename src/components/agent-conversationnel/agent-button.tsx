import clsx from "clsx";
import { trackEvent } from "@/src/helpers/matomo/track-matomo";
import { OPEN_ZEPHYR } from "@/src/helpers/matomo/matomo-tags";
import { AgentButtonPicto } from "./agent-button-picto";

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
        "fixed right-0 top-80 flex h-14 w-32 items-center gap-3 !bg-pfmv-navy px-3",
        "rounded-l-2xl",
        "transition-transform duration-300",
        "translate-x-[84px] hover:translate-x-0",
        "z-[900] shadow-[0px_6px_18px_0px_rgba(0,0,18,0.16)]",
        "disabled:pointer-events-none disabled:hidden",
      )}
    >
      <AgentButtonPicto />
      <span className="text-sm leading-4 text-white">Posez vos questions</span>
    </button>
  );
};
