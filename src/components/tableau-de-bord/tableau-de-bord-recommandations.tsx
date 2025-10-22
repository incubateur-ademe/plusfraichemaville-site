import { useProjetsStore } from "@/src/stores/projets/provider";
import { FicheCardSkeleton } from "../common/fiche-card-skeleton";
import { FicheSolutionCardWithFetcher } from "../ficheSolution/fiche-solution-card-with-fetcher";
import { useRecommandationsForCurrentProjet } from "@/src/hooks/use-recommandations-for-current-projet";

export const TableauDeBordRecommandation = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const { recommandations, isLoading } = useRecommandationsForCurrentProjet();

  if (!projet) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-8">
      <h1 className="mb-2 block text-[1.375rem] font-bold leading-snug text-dsfr-text-label-blue-france">
        Recommandations
      </h1>
      <p>
        Aucune solution ne peut résoudre seule la problématique de la surchauffe urbaine. <br /> Nous vous proposons ici
        des solutions complémentaires à celles que vous avez choisies afin de créer les meilleures combinaisons et
        synergies possibles.
      </p>
      {isLoading ? (
        <div className="flex gap-8">
          <FicheCardSkeleton />
          <FicheCardSkeleton />
          <FicheCardSkeleton />
        </div>
      ) : (
        recommandations?.map((fs) => <FicheSolutionCardWithFetcher complete id={fs.id} key={fs?.id} withoutModal />)
      )}
    </div>
  );
};
