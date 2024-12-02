import { RefObject, useEffect } from "react";

type UseClickOutsideManagementProps = {
  ref: RefObject<HTMLInputElement>;
  action: () => void;
};

export function useClickOutsideManagement({ ref, action }: UseClickOutsideManagementProps) {
  useEffect(() => {
    function handleClickOutside(event: TouchEvent | MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        action();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [action, ref]);
}
