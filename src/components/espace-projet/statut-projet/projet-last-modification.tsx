"use client";

import { useProjetsStore } from "@/src/stores/projets/provider";
import { daysUntilDate, getRelativeDate } from "@/src/helpers/dateUtils";

export const ProjetLastModification = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());

  const updatedAt = projet?.updated_at;
  const lastUpdate = updatedAt && -daysUntilDate(updatedAt)!;
  const formattedDate = getRelativeDate(lastUpdate);

  return (
    <>
      {updatedAt && (
        <section>
          <span className="block text-[18px] font-bold leading-6 text-pfmv-navy sm:text-end">Dernière mise à jour</span>
          <span className="block text-[18px] leading-6 text-pfmv-navy sm:text-end">{formattedDate}</span>
        </section>
      )}
    </>
  );
};
