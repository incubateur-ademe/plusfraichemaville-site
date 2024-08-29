import { useMemo, useState } from "react";
import { useWindowSize } from "usehooks-ts";

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
      dimensions: { width: expand ? width : 360, height: expand ? height : 450 },
      containerClassName: expand ? "bottom-0 left-0" : "bottom-10 right-10 rounded-2xl",
      rootClassName: expand ? "pt-14" : "pt-12",
    }),
    [expand, height, width],
  );

  return { isOpen, openChat, closeChat, expandChat, displayOptions };
};
