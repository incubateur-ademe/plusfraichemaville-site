"use client";

import { useProjetsStore } from "@/stores/projets/provider";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export const GenericSaveLabel = ({ isSaved, withLabel }: { isSaved: boolean; withLabel?: boolean }) => {
  const pathname = usePathname();
  const isFullpage = pathname.startsWith("/fiche-solution/") || pathname.startsWith("/fiches-diagnostic/");
  const currentProjetId = useProjetsStore((state) => state.currentProjetId);
  const label = currentProjetId ? "Ajouter au projet" : "Sauvegarder";

  if (!isFullpage || !withLabel) {
    return null;
  }
  return (
    <span
      className={clsx(
        "absolute block !left-10 top-1 -z-10",
        "mt-[1px] text-dsfr-text-label-blue-france text-sm font-bold",
      )}
    >
      {!isSaved && label}
    </span>
  );
};
