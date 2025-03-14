"use client";

import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { useProjetsStore } from "@/src/stores/projets/provider";
import clsx from "clsx";
import Image from "next/image";
import { TypeFiche } from "@/src/helpers/common";
import { TableauDeBordSuiviWithText } from "@/src/components/tableau-de-bord/tableau-de-bord-suivi-card-with-text";
import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { makeFicheSolutionCompleteUrlApi } from "../ficheSolution/helpers";
import { makeFicheDiagnosticUrlApi } from "../fiches-diagnostic/helpers";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";
import { Media } from "@/src/lib/strapi/types/common/Media";
import { getProjetFichesIdsByType } from "@/src/components/common/generic-save-fiche/helpers";

const IMAGE_SLICE_INDEX = 5;

export const TableauDeBordFichesDiagnoscticImages = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const selectedFichesDiagnostic = getProjetFichesIdsByType({ projet, typeFiche: TypeFiche.diagnostic });

  if (!selectedFichesDiagnostic || selectedFichesDiagnostic.length === 0) {
    return (
      <TableauDeBordSuiviWithText>
        Comprendre les enjeux de surchauffe sur votre territoire avec des données tangibles.
      </TableauDeBordSuiviWithText>
    );
  }
  return <TableauDeBordSFicheImages typeFiche={TypeFiche.diagnostic} selectedFichesIds={selectedFichesDiagnostic} />;
};

export const TableauDeBordFichesSolutionImages = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const selectedFichesSolutionsIds = getProjetFichesIdsByType({ projet, typeFiche: TypeFiche.solution });

  return <TableauDeBordSFicheImages typeFiche={TypeFiche.solution} selectedFichesIds={selectedFichesSolutionsIds} />;
};

const TableauDeBordSFicheImages = ({
  selectedFichesIds,
  typeFiche,
}: {
  selectedFichesIds?: number[];
  typeFiche: TypeFiche;
}) => {
  if (!selectedFichesIds) {
    return null;
  }

  return (
    <div className="flex">
      {selectedFichesIds
        .slice(0, IMAGE_SLICE_INDEX)
        .map((ficheId, index) =>
          typeFiche === TypeFiche.solution ? (
            <TableauDeBordFicheSolutionImage ficheSolutionId={ficheId.toString()} key={index} />
          ) : (
            <TableauDeBordFicheDiagnosticImage ficheDiagnosticId={ficheId.toString()} key={index} />
          ),
        )}
      {selectedFichesIds.length > IMAGE_SLICE_INDEX && (
        <div
          className={clsx(
            "mr-2 h-10 w-10 shrink-0 overflow-hidden rounded-[50%]",
            "flex items-center justify-center bg-dsfr-border-default-blue-france text-white",
          )}
        >
          +{selectedFichesIds.length - IMAGE_SLICE_INDEX}
        </div>
      )}
    </div>
  );
};

const TableauDeBordFicheSolutionImage = ({ ficheSolutionId }: { ficheSolutionId: string }) => {
  const { data } = useImmutableSwrWithFetcher<FicheSolution[]>(makeFicheSolutionCompleteUrlApi(ficheSolutionId));
  const ficheSolution = data && data[0];
  return <TableauSuiviFicheImages image={ficheSolution?.attributes.image_principale} />;
};

export const TableauDeBordFicheDiagnosticImage = ({ ficheDiagnosticId }: { ficheDiagnosticId: string }) => {
  const { data } = useImmutableSwrWithFetcher<FicheDiagnostic>(makeFicheDiagnosticUrlApi(ficheDiagnosticId));
  return <TableauSuiviFicheImages image={data?.attributes.image_principale} />;
};

const TableauSuiviFicheImages = ({ image }: { image: { data: Media } | null | undefined }) => {
  return (
    <div className="mr-2 h-10 w-10 shrink-0 overflow-hidden rounded-[50%]">
      <Image
        className="h-10 w-10 object-cover"
        alt="image"
        width={48}
        height={48}
        sizes="30vw md:5vw"
        src={getStrapiImageUrl(image, STRAPI_IMAGE_KEY_SIZE.small)}
        unoptimized
      />
    </div>
  );
};
