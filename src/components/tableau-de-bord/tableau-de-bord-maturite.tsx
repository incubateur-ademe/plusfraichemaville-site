import { useProjetsStore } from "@/src/stores/projets/provider";
import { Maturite } from "../maturite/maturite";

import { Spinner } from "../common/spinner";
import clsx from "clsx";
import { ProjetLastModification } from "@/src/components/espace-projet/statut-projet/projet-last-modification";

export const TableauDeBordMaturite = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());

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
      <ProjetLastModification />
    </div>
  );
};
