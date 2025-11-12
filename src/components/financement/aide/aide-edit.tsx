"use client";

import { AideEstimationsListeHeader } from "./aide-estimations-liste-header";
import { AideEstimationsPanelHeader } from "./aide-estimations-panel-header";
import { useParams } from "next/navigation";
import { AideCard } from "./aide-card";
import { AideCardSkeleton } from "./aide-card-skeleton";
import { AideEditFilter } from "./aide-edit-filter";
import { memo, useMemo } from "react";
import { countAidesByType, resolveAidType } from "../helpers";
import { TypeAidesTerritoiresAide } from "@/src/components/financement/types";
import { FichesDiagnosticFiltersKey, useAideEstimationEditFilter } from "@/src/hooks/use-aide-estimation-edit-filter";
import { GenericFicheLink } from "@/src/components/common/generic-save-fiche/generic-fiche-link";
import { PFMV_ROUTES } from "@/src/helpers/routes";

import { Pagination } from "@/src/components/common/pagination";
import { usePagination } from "@/src/hooks/use-pagination";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { AideEditSortField } from "@/src/components/financement/aide/aide-edit-sort-field";
import { useAideEstimationEditSortMethod } from "@/src/hooks/use-aide-estimation-edit-sort-method";
import { useCanEditProjet } from "@/src/hooks/use-can-edit-projet";
import { notifications } from "@/src/components/common/notifications";
import { useAidesByEstimationFetcher } from "@/src/hooks/use-aides-selected-by-estimation";
import { BREADCRUMB_FINANCEMENTS_LISTE } from "@/src/components/espace-projet/banner/breadcrumb-list/espace-projet-breadcurmb-financement";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";
import { dateToStringWithTime } from "@/src/helpers/dateUtils";

export const AideEdit = memo(() => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const canEditProjet = useCanEditProjet(projet?.id);

  const estimationId = useParams().estimationId as string;
  const { filters, toggleFilter } = useAideEstimationEditFilter();
  const skeletons = [...new Array(3)].map((_, i) => <AideCardSkeleton key={i} />);
  const estimation = projet?.estimations.find((estimation) => estimation.id === +estimationId);
  const { sortMethodCode, setSortMethodCode, sortMethod } = useAideEstimationEditSortMethod();

  const { data, isLoading } = useAidesByEstimationFetcher(+estimationId);
  const { aideFinanciereCount, aideTechniqueCount } = countAidesByType(data?.results ?? []);
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
            estimation?.estimations_aides.find((estimationAide) => estimationAide.aide.aideTerritoireId === aide.id),
        )
        .sort(sortMethod.sortMethod),
    [
      data?.results,
      estimation?.estimations_aides,
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

  return (
    <>
      {estimation?.created_at && (
        <BannerProjetBreadcrumb step={BREADCRUMB_FINANCEMENTS_LISTE(dateToStringWithTime(estimation.created_at))} />
      )}
      <div className="fr-container pt-8" id="financement-pagination">
        {/* eslint-disable-next-line max-len */}
        <AideEstimationsListeHeader title="Sélectionnez les financements et soutien à l'ingénierie pour lesquels vous souhaitez envoyer une candidature" />
        <div className="pfmv-card no-shadow pfmv-card-outline mb-8 w-full p-8">
          <AideEstimationsPanelHeader estimation={estimation} />

          <div className="mb-10 flex flex-row items-center justify-between">
            <AideEditFilter
              filters={filters}
              toggleFilter={handleFiltersChange}
              aideFinanciereCount={aideFinanciereCount}
              aideTechniqueCount={aideTechniqueCount}
              selectedAidesCount={estimation?.estimations_aides?.length || 0}
              isLoading={isLoading}
            />
            <AideEditSortField sortMethodCode={sortMethodCode} setSortMethodCode={setSortMethodCode} />
          </div>

          <div className="aide-card flex flex-wrap gap-6">
            {isLoading
              ? skeletons
              : paginatedResults?.map((aide) => <AideCard aide={aide} withSaveButton={canEditProjet} key={aide.id} />)}
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

AideEdit.displayName = "AideEdit";
