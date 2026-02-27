import { isEmpty } from "@/src/helpers/listUtils";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { getTypeSolutionFromCode } from "@/src/helpers/type-fiche-solution";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import Tag from "@codegouvfr/react-dsfr/Tag";
import LinkWithoutPrefetch from "../../common/link-without-prefetch";

interface AideSolutionsFilterProps {
  ficheSolutions?: FicheSolution[];
  selectedFsIds: number[];
  toggleFicheSolution: (ficheSolutionId: number) => void;
  projetId: number;
}

export const AideSolutionsFilter = ({
  ficheSolutions,
  selectedFsIds,
  toggleFicheSolution,
  projetId,
}: AideSolutionsFilterProps) => {
  if (!isEmpty(ficheSolutions)) {
    return (
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
              {getTypeSolutionFromCode(fiche.attributes.type_solution)?.icon("fr-icon--sm mr-1")}{" "}
              {fiche.attributes.titre}
            </Tag>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 flex items-center gap-4">
      <p className="text-dsfr-text-default-info m-0 text-base">
        Pour voir des aides plus pertinentes, sélectionnez des solutions dans votre projet
      </p>
      <LinkWithoutPrefetch
        href={PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS(projetId)}
        className="fr-btn fr-btn--secondary fr-btn--sm shrink-0 rounded-3xl"
      >
        Ajouter des solutions
      </LinkWithoutPrefetch>
    </div>
  );
};
