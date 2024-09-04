import { getTailwindTheme } from "@/helpers/common";
import { useEffect, useMemo, useState } from "react";
import { useWindowSize } from "usehooks-ts";

const CHAT_WIDTH = 360;
const CHAT_HEIGHT = 540;
const TAILWIND_BREAKPOINT_SM = Number.parseInt(getTailwindTheme().screens.sm);

export type ChatDisplayOptions = {
  dimensions: { width: number; height: number };
  containerClassName: string;
  rootClassName: string;
  expanded: boolean;
};

export const useAiChatControls = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expand, setExpand] = useState(false);
  const { width, height } = useWindowSize();

  const expandChat = () => setExpand(!expand);
  const openChat = () => setIsOpen(true);
  const closeChat = () => {
    setIsOpen(false);
    setExpand(false);
  };

  useEffect(() => {
    if (width < TAILWIND_BREAKPOINT_SM) {
      setExpand(true);
    }
  }, [width, isOpen]);

  const displayOptions: ChatDisplayOptions = useMemo(
    () => ({
      dimensions: { width: expand ? width : CHAT_WIDTH, height: expand ? height : CHAT_HEIGHT },
      containerClassName: `${expand ? "bottom-0 left-0" : "bottom-10 right-10 rounded-2xl"} ${
        isOpen ? "block" : "hidden"
      }`,
      rootClassName: expand ? "ai-chat-expand pt-14" : "pt-12",
      expanded: expand,
    }),
    [expand, isOpen, height, width],
  );

  return { isOpen, openChat, closeChat, expandChat, displayOptions };
};
