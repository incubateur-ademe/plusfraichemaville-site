"use client";

import "@splidejs/splide/css/core";
// TODO: Check changelog from Splide and remove ts-ignore
// @ts-ignore
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { GenericFicheLink } from "../common/generic-save-fiche/generic-fiche-link";
import { GET_FICHE_DIAGNOSTIC_BY_IDS, PFMV_ROUTES } from "@/src/helpers/routes";
import { useCanEditProjet } from "@/src/hooks/use-can-edit-projet";
import { getProjetFichesIdsByType } from "@/src/components/common/generic-save-fiche/helpers";
import { TypeFiche } from "@/src/helpers/common";
import { isEmpty } from "@/src/helpers/listUtils";
import { FichesDiagnosticsProjetEmpty } from "@/src/components/fiches-diagnostic/fiches-diagnostics-projet-empty";
import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";
import { FicheDiagnosticCard } from "./fiche-diagnostic-card";
import { FicheDiagnosticCardSkeleton } from "./fiche-diagnostic-card-skeleton";
import countBy from "lodash/countBy";
import orderBy from "lodash/orderBy";
import uniqBy from "lodash/uniqBy";
import { RetourExperienceDiagCard } from "../retour-experience-diag/retour-experience-diag-card";
import { FicheDiagnosticProjetListeAddButton } from "./fiche-diagnostic-projet-liste-add-button";
import { SplideController } from "../common/splide-controllers";
import { RetourExperienceDiagCardSkeleton } from "../retour-experience-diag/retour-experience-diag-card-skeleton";
import clsx from "clsx";

export const FichesDiagnosticsProjetSelected = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const savedFichesDiagnostic = getProjetFichesIdsByType({ projet, typeFiche: TypeFiche.diagnostic });
  const canEditProjet = useCanEditProjet(projet?.id);

  const { data: fichesDiagnostic, isLoading } = useImmutableSwrWithFetcher<FicheDiagnostic[]>(
    savedFichesDiagnostic && savedFichesDiagnostic.length > 0
      ? GET_FICHE_DIAGNOSTIC_BY_IDS(savedFichesDiagnostic)
      : null,
  );

  const liensRex = fichesDiagnostic
    ?.map((fd) => fd.attributes.lien_rex_diagnostics.data.map((lien) => lien.attributes.retour_experience_diagnostic))
    .flat();

  const frequencies = countBy(liensRex, (rex) => rex?.data?.id || "");
  const uniqueRex = uniqBy(liensRex, (rex) => rex?.data?.id);
  const sortedRex = liensRex
    ? orderBy(uniqueRex, (item) => (item?.data?.id ? frequencies[item.data.id] : 0), "desc")
    : [];

  return (
    <div>
      <div className="mb-28 flex flex-row flex-wrap gap-8">
        {isLoading && savedFichesDiagnostic ? (
          savedFichesDiagnostic.map((_, index) => <FicheDiagnosticCardSkeleton key={index} />)
        ) : isEmpty(savedFichesDiagnostic) ? (
          <FichesDiagnosticsProjetEmpty />
        ) : (
          fichesDiagnostic?.map((ficheDiagnostic, index) => (
            <FicheDiagnosticCard ficheDiagnostic={ficheDiagnostic} key={index} />
          ))
        )}

        {canEditProjet && (
          <div className="flex items-center">
            <FicheDiagnosticProjetListeAddButton />
          </div>
        )}
      </div>

      <h2 className="mb-9 text-2xl font-bold">
        Ces collectivités partagent leur expérience sur l'utilisation de ces méthodes de diagnostic
      </h2>

      {isLoading && savedFichesDiagnostic ? (
        <div className="relative mb-12 flex gap-4 overflow-x-auto p-5 pl-1">
          {sortedRex.map((_, index) => (
            <RetourExperienceDiagCardSkeleton key={index} />
          ))}
        </div>
      ) : sortedRex.length > 1 ? (
        <div className="relative">
          <Splide
            hasTrack={false}
            options={{
              rewind: true,
              gap: "1rem",
              autoWidth: true,
            }}
            className="mb-12"
          >
            <SplideTrack className="p-5 !pl-1">
              {sortedRex.map(
                (rex) =>
                  rex?.data && (
                    <SplideSlide key={rex.data.id}>
                      <RetourExperienceDiagCard rex={rex.data} className="h-full" />
                    </SplideSlide>
                  ),
              )}
            </SplideTrack>
            <SplideController
              arrow="left"
              size={{ width: "w-14", height: "h-14" }}
              position={{ top: "top-28", left: "-7" }}
              className={clsx(sortedRex.length === 2 ? "!block lg:!hidden" : "!block")}
            />
            <SplideController
              arrow="right"
              size={{ width: "w-14", height: "h-14" }}
              position={{ top: "top-28", right: "-7" }}
              className={clsx(sortedRex.length === 2 ? "!block lg:!hidden" : "!block")}
            />
          </Splide>
        </div>
      ) : (
        sortedRex[0] && sortedRex[0] && <RetourExperienceDiagCard rex={sortedRex[0].data} className="mb-20 h-full" />
      )}

      <GenericFicheLink
        href={PFMV_ROUTES.ESPACE_PROJET_TABLEAU_DE_BORD}
        className="fr-btn fr-btn--secondary rounded-3xl"
      >
        Revenir au tableau de bord
      </GenericFicheLink>
    </div>
  );
};
