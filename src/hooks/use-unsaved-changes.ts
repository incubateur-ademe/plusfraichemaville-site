import { useEffect } from "react";

export const useUnsavedChanges = (isDirty: boolean) => {
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
        if (anchor) {
          // Check if link opens in new tab
          if (anchor.target === "_blank") {
            return;
          }

          if (
            !window.confirm(
              "Attention, certains champs n'ont pas été enregistrés, êtes-vous sûr de vouloir quitter la page ?",
            )
          ) {
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
  }, [isDirty]);
};
