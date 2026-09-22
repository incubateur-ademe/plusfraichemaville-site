import { useEffect } from "react";

const DEFAULT_MESSAGE =
  "Attention, certains champs n'ont pas été enregistrés," + " êtes-vous sûr de vouloir quitter la page ?";

export const useUnsavedChanges = (isDirty: boolean, message: string = DEFAULT_MESSAGE) => {
  useEffect(() => {
    // Handle browser navigation (reload, close tab)
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = true;
      }
    };

    // Handle internal navigation (clicks on links)
    const handleAnchorClick = (e: MouseEvent) => {
      if (isDirty) {
        const target = e.target as HTMLElement;
        const anchor = target.closest("a");
        const button = target.closest("button");
        if (anchor) {
          // Opening in a new tab, or downloading a file (e.g. a programmatic `link.click()` on
          // an <a download> built from a blob URL), never navigates away from the current page
          if (anchor.target === "_blank" || anchor.hasAttribute("download")) {
            return;
          }

          if (!window.confirm(message)) {
            e.preventDefault();
            e.stopPropagation();
          }
        } else if (
          button &&
          button.getAttribute("role") === "tab" &&
          button.getAttribute("aria-selected") === "false"
        ) {
          if (!window.confirm(message)) {
            e.preventDefault();
            e.stopPropagation();
          }
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    // Use capture phase to intercept clicks before they are handled by Next.js Link
    document.addEventListener("click", handleAnchorClick, true);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("click", handleAnchorClick, true);
    };
  }, [isDirty, message]);
};
