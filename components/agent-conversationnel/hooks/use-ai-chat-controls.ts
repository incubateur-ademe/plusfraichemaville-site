import { useMemo, useState } from "react";
import { useWindowSize } from "usehooks-ts";

const CHAT_WIDTH = 360;
const CHAT_HEIGHT = 540;

export const useAiChatControls = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expand, setExpand] = useState(false);
  const { width, height } = useWindowSize();

  const openChat = () => setIsOpen(true);
  const closeChat = () => {
    setIsOpen(false);
    setExpand(false);
  };
  const expandChat = () => setExpand(!expand);

  const displayOptions = useMemo(
    () => ({
      dimensions: { width: expand ? width : CHAT_WIDTH, height: expand ? height : CHAT_HEIGHT },
      containerClassName: expand ? "bottom-0 left-0" : "bottom-10 right-10 rounded-2xl",
      rootClassName: expand ? "ai-chat-expand pt-14" : "pt-12",
    }),
    [expand, height, width],
  );

  return { isOpen, openChat, closeChat, expandChat, displayOptions };
};
