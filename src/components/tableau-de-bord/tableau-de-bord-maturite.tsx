import { useProjetsStore } from "@/src/stores/projets/provider";
import { Maturite } from "../maturite/maturite";

import { Spinner } from "../common/spinner";
import { daysUntilDate, getRelativeDate } from "@/src/helpers/dateUtils";
import clsx from "clsx";

export const TableauDeBordMaturite = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());

  const updatedAt = projet?.updated_at;
  const lastUpdate = updatedAt && -daysUntilDate(updatedAt)!;
  const formattedDate = getRelativeDate(lastUpdate);

  return (
    <div
      className={clsx(
        "mb-8 flex w-full max-w-[70.5rem] flex-col gap-6 rounded-2xl bg-white px-8 py-4 sm:flex-row",
        "sm:items-center sm:justify-between",
      )}
    >
      <section>
        <label htmlFor="maturite-select" className="font-bold text-black">
          Maturité du projet
        </label>
        <div className="h-10">
          {projet ? (
            <Maturite id="maturite-select" niveau={projet?.niveau_maturite} projetId={projet.id} withLabel />
          ) : (
            <Spinner className="w-6" />
          )}
        </div>
      </section>
      {updatedAt && (
        <section>
          <span className="block text-[18px] font-bold leading-6 text-pfmv-navy sm:text-end">
            Dernière modification
          </span>
          <span className="block text-[18px] leading-6 text-pfmv-navy sm:text-end">{formattedDate}</span>
        </section>
      )}
    </div>
  );
};
