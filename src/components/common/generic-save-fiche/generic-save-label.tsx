"use client";

import { useProjetsStore } from "@/src/stores/projets/provider";
import clsx from "clsx";

export const GenericSaveLabel = ({ isSaved, withLabel }: { isSaved: boolean; withLabel?: boolean }) => {
  const currentProjetId = useProjetsStore((state) => state.currentProjetId);
  const label = currentProjetId ? "Ajouter au projet" : "Sauvegarder";

  return (
    <span
      className={clsx(
        "absolute !left-10 top-1 -z-10 w-[7.5rem]",
        "mt-[1px] text-sm font-bold text-dsfr-text-label-blue-france",
      )}
    >
      {!isSaved && withLabel && label}
    </span>
  );
};
