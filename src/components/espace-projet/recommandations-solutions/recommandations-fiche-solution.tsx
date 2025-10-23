"use client";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { useRecommandationsForCurrentProjet } from "@/src/hooks/use-recommandations-for-current-projet";
import { useRecommandationsViewed } from "@/src/hooks/use-recommandations-viewed";
import { useEffect } from "react";
import { FicheCardSkeleton } from "@/src/components/common/fiche-card-skeleton";
import { FicheSolutionCardWithFetcher } from "@/src/components/ficheSolution/fiche-solution-card-with-fetcher";
import { Case, Conditional, Default } from "@/src/components/common/conditional-renderer";
import { isEmpty } from "@/src/helpers/listUtils";

export const RecommandationsFicheSolution = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const { recommandations, isLoading } = useRecommandationsForCurrentProjet();
  const { recommandationsAlreadyViewed, updateToRecommandationsViewed } = useRecommandationsViewed();

  useEffect(() => {
    if (recommandationsAlreadyViewed) {
      updateToRecommandationsViewed();
    }
  }, [recommandationsAlreadyViewed]);

  if (!projet) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-8">
      <Conditional>
        <Case condition={isLoading}>
          <div className="flex gap-8">
            <FicheCardSkeleton />
            <FicheCardSkeleton />
            <FicheCardSkeleton />
          </div>
        </Case>
        <Default>
          {isEmpty(recommandations) ? (
            <p className="font-bold">
              Nous n'avons plus de recommandations, votre sélection de solutions est complète.
            </p>
          ) : (
            <>
              {recommandations.map((fs) => (
                <FicheSolutionCardWithFetcher complete id={fs.id} key={fs?.id} withoutModal />
              ))}
            </>
          )}
        </Default>
      </Conditional>
    </div>
  );
};
