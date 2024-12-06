import { PFMV_ROUTES } from "@/src/helpers/routes";
import { FicheBookmarkedSolution } from "../common/generic-save-fiche/helpers";
import BookmarkedFicheSolutionByProject from "../favoris/BookmarkedFicheSolution";
import Button from "@codegouvfr/react-dsfr/Button";
import { FavorisAccordion } from "./fiches-solutions-favoris-accordion";

export const FichesSolutionsFavoris = ({
  bookmarkedFichesSolutions,
}: {
  bookmarkedFichesSolutions: FicheBookmarkedSolution[];
}) => {
  return bookmarkedFichesSolutions && bookmarkedFichesSolutions.length === 0 ? (
    <div className="mb-8 rounded-[20px] bg-dsfr-background-default-grey-hover p-6">
      <h2 className="mb-0 text-[22px] text-black">Mes solutions mises en favoris</h2>
      <div>{"Retrouvez ici vos solutions sauvegardées."}</div>
      <div>{"Vous n'avez pas encore sélectionné de fiches solutions."}</div>
      <Button
        linkProps={{
          href: PFMV_ROUTES.FICHES_SOLUTIONS,
        }}
        className={"mt-8 rounded-3xl"}
      >
        Découvrir les solutions
      </Button>
    </div>
  ) : (
    bookmarkedFichesSolutions &&
      bookmarkedFichesSolutions
        .sort((a, b) => b.projectName.localeCompare(a.projectName))
        .map((pb) => (
          <FavorisAccordion count={pb.ficheSolutionIds.length} type="solution" projectName={pb.projectName}>
            <BookmarkedFicheSolutionByProject
              projectName={pb.projectName}
              ficheSolutionIds={pb.ficheSolutionIds}
              key={pb.projectName}
            />
          </FavorisAccordion>
        ))
  );
};
