"use client";
import { TypeFiche } from "@/src/helpers/common";
import { isEmpty } from "@/src/helpers/listUtils";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { getTypeSolutionFromCode } from "@/src/helpers/type-fiche-solution";
import { useAideEstimationEditFilter, FichesDiagnosticFiltersKey } from "@/src/hooks/use-aide-estimation-edit-filter";
import { useAideEstimationEditSortMethod } from "@/src/hooks/use-aide-estimation-edit-sort-method";
import { useAidesByProjetFetcher } from "@/src/hooks/use-aides-by-projet-fetcher";
import { useCanEditProjet } from "@/src/hooks/use-can-edit-projet";
import { usePagination } from "@/src/hooks/use-pagination";
import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { useUserStore } from "@/src/stores/user/provider";
import Tag from "@codegouvfr/react-dsfr/Tag";
import { memo, useState, useMemo } from "react";
import { GenericFicheLink } from "../../common/generic-save-fiche/generic-fiche-link";
import { getProjetFichesIdsByType } from "../../common/generic-save-fiche/helpers";
import LinkWithoutPrefetch from "../../common/link-without-prefetch";
import { notifications } from "../../common/notifications";
import { Pagination } from "../../common/pagination";
import BannerProjetBreadcrumb from "../../espace-projet/banner/banner-projet-breadcrumb";
import { BREADCRUMB_FINANCEMENTS_LISTE } from "../../espace-projet/banner/breadcrumb-list/espace-projet-breadcurmb-financement";
import { makeFicheSolutionUrlApi } from "../../ficheSolution/helpers";
import { countAidesByType, countSelectedAides, resolveAidType } from "../helpers";
import { TypeAidesTerritoiresAide } from "../types";
import { AideCard } from "./aide-card";
import { AideCardSkeleton } from "./aide-card-skeleton";
import { AideEditFilter } from "./aide-edit-filter";
import { AideEditSortField } from "./aide-edit-sort-field";
import { AideProjetListeHeader } from "./aide-projet-liste-header";
import { AideProjetPanelHeader } from "./aide-projet-panel-header";

export const AideProjetEdit = memo(() => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const canEditProjet = useCanEditProjet(projet?.id);
  const projetId = projet?.id ?? 0;

  const { filters, toggleFilter } = useAideEstimationEditFilter();
  const skeletons = [...new Array(3)].map((_, i) => <AideCardSkeleton key={i} />);
  const { sortMethodCode, setSortMethodCode, sortMethod } = useAideEstimationEditSortMethod();

  const currentUserId = useUserStore((state) => state.userInfos?.id);
  const userProjet = projet?.users.find((u) => u.user_id === currentUserId);
  const unselectedFsIds = userProjet?.aides_fs_unselected || [];

  const allFicheSolutionIds = getProjetFichesIdsByType({ projet, typeFiche: TypeFiche.solution }) ?? [];
  const [selectedFsIds, setSelectedFsIds] = useState<number[]>(
    allFicheSolutionIds.filter((id) => !unselectedFsIds.includes(id)),
  );

  const { data: ficheSolutions } = useImmutableSwrWithFetcher<FicheSolution[]>(
    allFicheSolutionIds.length > 0 ? makeFicheSolutionUrlApi(allFicheSolutionIds) : "",
  );

  const updateUserProjetInProjet = useProjetsStore((state) => state.updateUserProjetInProjet);

  const toggleFicheSolution = (ficheSolutionId: number) => {
    const newSelectedFsIds = selectedFsIds.includes(ficheSolutionId)
      ? selectedFsIds.filter((x) => x !== ficheSolutionId)
      : [...selectedFsIds, ficheSolutionId];

    setSelectedFsIds(newSelectedFsIds);
    handlePageChange(1, { needScrollToTop: false });

    if (userProjet) {
      updateUserProjetInProjet({
        ...userProjet,
        aides_fs_unselected: allFicheSolutionIds.filter((fsId) => !newSelectedFsIds.includes(fsId)),
      });
    }
  };

  const { data, isLoading } = useAidesByProjetFetcher(projetId, selectedFsIds);
  const { aideFinanciereCount, aideTechniqueCount } = countAidesByType(data?.results ?? []);
  const selectedAidesCount = useMemo(
    () => countSelectedAides(data?.results ?? [], projet?.projetAides ?? []),
    [data?.results, projet?.projetAides],
  );
  const filteredResults = useMemo(
    () =>
      data?.results
        .filter(
          (aide) =>
            filters.showAidesIngenierie || resolveAidType(aide.aid_types_full) !== TypeAidesTerritoiresAide.ingenierie,
        )
        .filter(
          (aide) =>
            filters.showAidesFinancieres ||
            resolveAidType(aide.aid_types_full) !== TypeAidesTerritoiresAide.financement,
        )
        .filter(
          (aide) =>
            !filters.selectedAides ||
            projet?.projetAides.find((projetAide) => projetAide.aide.aideTerritoireId === aide.id),
        )
        .sort(sortMethod.sortMethod),
    [
      data?.results,
      projet?.projetAides,
      filters.selectedAides,
      filters.showAidesFinancieres,
      filters.showAidesIngenierie,
      sortMethod,
    ],
  );
  const { paginatedResults, currentPage, handlePageChange, itemsPerPage } = usePagination({
    data: filteredResults,
    itemsPerPage: 9,
  });

  const handleFiltersChange = (key: FichesDiagnosticFiltersKey) => {
    toggleFilter(key);
    handlePageChange(1, { needScrollToTop: false });
  };

  if (!projet) {
    return null;
  }

  return (
    <>
      <BannerProjetBreadcrumb step={BREADCRUMB_FINANCEMENTS_LISTE} />
      <div className="fr-container pt-8" id="financement-pagination">
        <AideProjetListeHeader
          title="Sélectionnez les financements et soutien à l'ingénierie pour lesquels vous
         souhaitez envoyer une candidature"
        />
        <div className="pfmv-card no-shadow pfmv-card-outline mb-8 w-full p-8">
          <AideProjetPanelHeader />

          {!isEmpty(ficheSolutions) ? (
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
          ) : (
            <div className="mb-6 flex items-center gap-4">
              <p className="text-dsfr-text-default-info m-0 text-base">
                Pour voir des aides plus pertinentes, sélectionnez des solutions dans votre projet
              </p>
              <LinkWithoutPrefetch
                href={PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS(projet.id)}
                className="fr-btn fr-btn--secondary fr-btn--sm shrink-0 rounded-3xl"
              >
                Ajouter des solutions
              </LinkWithoutPrefetch>
            </div>
          )}

          <div className="mb-10 flex flex-row items-center justify-between">
            <AideEditFilter
              filters={filters}
              toggleFilter={handleFiltersChange}
              aideFinanciereCount={aideFinanciereCount}
              aideTechniqueCount={aideTechniqueCount}
              selectedAidesCount={selectedAidesCount}
              isLoading={isLoading}
            />
            <AideEditSortField sortMethodCode={sortMethodCode} setSortMethodCode={setSortMethodCode} />
          </div>

          <div className="aide-card flex flex-wrap gap-6">
            {isLoading
              ? skeletons
              : paginatedResults?.map((aide) => (
                  <AideCard aide={aide} withSaveButton={canEditProjet} projetId={projetId} key={aide.id} />
                ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <GenericFicheLink
            href={PFMV_ROUTES.ESPACE_PROJET_FINANCEMENT_LISTE_ESTIMATION}
            className="fr-btn fr-btn--secondary h-fit rounded-3xl"
          >
            Précédent
          </GenericFicheLink>
          {filteredResults && (
            <Pagination
              count={Math.ceil(filteredResults.length / itemsPerPage)}
              defaultPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
          <GenericFicheLink
            href={PFMV_ROUTES.ESPACE_PROJET_FINANCEMENT_LISTE_ESTIMATION}
            className="fr-btn fr-btn--primary h-fit rounded-3xl"
            onClick={() => notifications("success", "AIDE_SELECTION_VALIDATED")}
          >
            Valider
          </GenericFicheLink>
        </div>
      </div>
    </>
  );
});
