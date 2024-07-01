"use client";

import { AideEstimationsListeHeader } from "./aide-estimations-liste-header";
import { AideEstimationsPanelHeader } from "./aide-estimations-panel-header";
import { useParams } from "next/navigation";
import { AideCard } from "./aide-card";
import { AideCardSkeleton } from "./aide-card-skeleton";
import { useAidesByEstimationFetcher } from "@/hooks/use-aides-by-estimation";
import { AideEditFilter } from "./aide-edit-filter";
import { memo, useMemo, useState } from "react";

import { countAidesByType, resolveAidType } from "../helpers";
import { TypeAidesTerritoiresAide } from "@/components/financement/types";
import { useAideEstimationEditFilter } from "@/hooks/use-aide-estimation-edit-filter";
import { GenericFicheLink } from "@/components/common/generic-save-fiche/generic-fiche-link";
import { PFMV_ROUTES } from "@/helpers/routes";
import toast from "react-hot-toast";
import { Pagination } from "@/components/common/pagination";

export const AideEdit = memo(() => {
  const estimationId = useParams().estimationId as string;
  const skeletons = [...new Array(4)].map((_, i) => <AideCardSkeleton key={i} />);
  const { filters, toggleFilter } = useAideEstimationEditFilter();

  const { data, isLoading } = useAidesByEstimationFetcher(estimationId);
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
        ),
    [data?.results, filters.showAidesFinancieres, filters.showAidesIngenierie],
  );

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 40;

  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredResults?.slice(startIndex, endIndex);
  }, [filteredResults, currentPage, ITEMS_PER_PAGE]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="fr-container pt-8">
      {/* eslint-disable-next-line max-len */}
      <AideEstimationsListeHeader title="Sélectionnez les financements et soutien à l'ingénierie pour lesquels vous souhaitez envoyer une candidature" />
      <div className="pfmv-card no-shadow pfmv-card-outline mb-8 w-full p-8">
        <AideEstimationsPanelHeader />

        <AideEditFilter
          filters={filters}
          toggleFilter={toggleFilter}
          aideFinanciereCount={aideFinanciereCount}
          aideTechniqueCount={aideTechniqueCount}
          isLoading={isLoading}
        />

        <div className="aide-card flex flex-wrap gap-6">
          {isLoading
            ? skeletons
            : paginatedResults?.map((aide) => <AideCard aide={aide} withSaveButton key={aide.id} />)}
        </div>
      </div>
      <div className="flex justify-between">
        <GenericFicheLink
          href={PFMV_ROUTES.ESPACE_PROJET_FINANCEMENT_LISTE_ESTIMATION}
          className="fr-btn fr-btn--secondary rounded-3xl"
        >
          Précédent
        </GenericFicheLink>
        <GenericFicheLink
          href={PFMV_ROUTES.ESPACE_PROJET_FINANCEMENT_LISTE_ESTIMATION}
          className="fr-btn fr-btn--primary rounded-3xl"
          onClick={() => toast.success("Votre sélection a bien été validée")}
        >
          Valider
        </GenericFicheLink>
      </div>
      {filteredResults && (
        <Pagination
          count={Math.ceil(filteredResults.length / ITEMS_PER_PAGE)}
          defaultPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
});

AideEdit.displayName = "AideEdit";
