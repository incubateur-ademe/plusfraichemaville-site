import { PFMV_ROUTES } from "@/src/helpers/routes";
import { FicheBookmarkedSolution } from "../common/generic-save-fiche/helpers";
import BookmarkedFicheSolutionByProject from "../favoris/BookmarkedFicheSolution";
import Button from "@codegouvfr/react-dsfr/Button";

export const FichesSolutionsFavoris = ({
  bookmarkedFichesSolutions,
}: {
  bookmarkedFichesSolutions: FicheBookmarkedSolution[];
}) => {
  return bookmarkedFichesSolutions && bookmarkedFichesSolutions.length === 0 ? (
    <div className="pb-20">
      <div className="fr-h3">Mes solutions sauvegardées</div>
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
          <div key={pb.projectName} className="pb-20">
            <BookmarkedFicheSolutionByProject projectName={pb.projectName} ficheSolutionIds={pb.ficheSolutionIds} />
          </div>
        ))
  );
};
