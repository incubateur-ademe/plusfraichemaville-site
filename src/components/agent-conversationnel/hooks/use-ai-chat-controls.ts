import { useEffect, useMemo, useState } from "react";
import { useWindowSize } from "usehooks-ts";

export const CHAT_WIDTH = 360;
export const CHAT_HEIGHT = 540;
const TAILWIND_BREAKPOINT_SM = 640;

export type ChatDisplayOptions = {
  dimensions: { width: number; height: number };
  containerClassName: string;
  rootClassName: string;
  expanded: boolean;
  toggleChat: () => void;
};

export const useAiChatControls = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expand, setExpand] = useState(false);
  const { width, height } = useWindowSize();
  const expandChat = () => setExpand(!expand);
  const minimizeChat = () => setExpand(false);
  const toggle = () => setIsOpen(!isOpen);
  const closeChat = () => {
    setIsOpen(false);
    setExpand(false);
  };

  const controllers = {
    isOpen,
    toggle,
    expandChat,
    closeChat,
    minimizeChat,
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
      toggleChat: width < TAILWIND_BREAKPOINT_SM ? closeChat : minimizeChat,
    }),
    [expand, isOpen, height, width],
  );

  return { displayOptions, controllers };
};
