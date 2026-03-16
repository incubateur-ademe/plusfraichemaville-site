import { isEmpty } from "@/src/helpers/listUtils";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { getTypeSolutionFromCode } from "@/src/helpers/type-fiche-solution";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import Tag from "@codegouvfr/react-dsfr/Tag";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { makeFicheSolutionUrlApi } from "@/src/components/ficheSolution/helpers";
import { useProjetsStore } from "@/src/stores/projets/provider";

interface AideSolutionsFilterProps {
  selectedFsIds: number[];
  toggleFicheSolution: (ficheSolutionId: number) => void;
  allFicheSolutionIds: number[];
}

export const AideSolutionsFilter = ({
  selectedFsIds,
  toggleFicheSolution,
  allFicheSolutionIds,
}: AideSolutionsFilterProps) => {
  const { data: ficheSolutions } = useImmutableSwrWithFetcher<FicheSolution[]>(
    allFicheSolutionIds.length > 0 ? makeFicheSolutionUrlApi(allFicheSolutionIds) : "",
  );
  const currentProjetId = useProjetsStore((state) => state.currentProjetId);

  return !isEmpty(ficheSolutions) ? (
    <div className="flex gap-4">
      <span className="text-nowrap">Solutions :</span>

      <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        {ficheSolutions?.map((fiche) => (
          <Tag
            key={fiche.id}
            pressed={selectedFsIds.includes(+fiche.id)}
            nativeButtonProps={{
              onClick: () => toggleFicheSolution(+fiche.id),
            }}
          >
            {getTypeSolutionFromCode(fiche.attributes.type_solution)?.icon("fr-icon--sm mr-1")} {fiche.attributes.titre}
          </Tag>
        ))}
      </div>
    </div>
  ) : (
    <div className="mb-6 flex items-center gap-4">
      <p className="text-dsfr-text-default-info m-0 text-base">
        Pour voir des aides plus pertinentes, sélectionnez des solutions dans votre projet
      </p>
      <LinkWithoutPrefetch
        href={PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS(currentProjetId || 0)}
        className="fr-btn fr-btn--secondary fr-btn--sm shrink-0 rounded-3xl"
      >
        Ajouter des solutions
      </LinkWithoutPrefetch>
    </div>
  );
};
