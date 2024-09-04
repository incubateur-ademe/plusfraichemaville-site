import { useEffect, useMemo, useState, useRef } from "react";
import { useWindowSize } from "usehooks-ts";

const CHAT_WIDTH = 360;
const CHAT_HEIGHT = 540;
const TAILWIND_BREAKPOINT_SM = 640;

export const useAiChatControls = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expand, setExpand] = useState(false);
  const { width, height } = useWindowSize();
  const prevWidthRef = useRef(width);

  const expandChat = () => setExpand(!expand);
  const openChat = () => setIsOpen(true);
  const closeChat = () => {
    setIsOpen(false);
    setExpand(false);
  };

  useEffect(() => {
    const prevWidth = prevWidthRef.current;
    prevWidthRef.current = width;

    if (width < TAILWIND_BREAKPOINT_SM) {
      setExpand(true);
    } else if (prevWidth < TAILWIND_BREAKPOINT_SM && width >= TAILWIND_BREAKPOINT_SM) {
      setExpand(false);
    }
  }, [width, isOpen]);

  const displayOptions = useMemo(
    () => ({
      dimensions: { width: expand ? width : CHAT_WIDTH, height: expand ? height : CHAT_HEIGHT },
      containerClassName: `${expand ? "bottom-0 left-0" : "bottom-10 right-10 rounded-2xl"} ${
        isOpen ? "block" : "hidden"
      }`,
      rootClassName: expand ? "ai-chat-expand pt-14" : "pt-12",
    }),
    [expand, isOpen, height, width],
  );

  return { isOpen, openChat, closeChat, expandChat, displayOptions };
};
