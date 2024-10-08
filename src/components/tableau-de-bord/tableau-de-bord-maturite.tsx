import { useProjetsStore } from "@/src/stores/projets/provider";
import { Maturite } from "../maturite/maturite";
import { daysUntilDate } from "@/src/helpers/common";
import { Spinner } from "../common/spinner";

export const TableauDeBordMaturite = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const updatedAt = projet?.updated_at;
  const lastUpdate = updatedAt && -daysUntilDate(updatedAt)!;
  const formattedDate = !lastUpdate ? "Aujourd'hui" : lastUpdate === 1 ? "Hier" : `Il y a ${lastUpdate} jours`;

  return (
    <div className="mb-8 flex h-24 w-[70.5rem] items-center justify-between rounded-2xl bg-white px-8">
      <div>
        <span className="font-bold text-black">Maturité du projet</span>
        <div className="h-10">
          {projet ? (
            <Maturite niveau={projet?.niveau_maturite} projetId={projet.id} withLabel />
          ) : (
            <Spinner className="w-6" />
          )}
        </div>
      </div>
      <div>
        <span className="block text-end text-[18px] font-bold leading-6 text-pfmv-navy">Dernière modification</span>
        <span className="block text-end text-[18px] leading-6 text-pfmv-navy">{formattedDate}</span>
      </div>
    </div>
  );
};
