"use client";

import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/lib/strapi/strapiClient";
import { useProjetsStore } from "@/stores/projets/provider";
import clsx from "clsx";
import Image from "next/image";
import { APIResponse } from "@/lib/strapi/types/types";
import { TypeFiche } from "@/helpers/common";
import { TableauDeBordSuiviWithText } from "@/components/tableau-de-bord/tableau-de-bord-suivi-card-with-text";
import { useImmutableSwrWithFetcher } from "@/hooks/use-swr-with-fetcher";
import { makeFicheSolutionCompleteUrlApi } from "../ficheSolution/helpers";
import { FicheSolutionResponse } from "../ficheSolution/type";
import { FicheDiagnosticResponse } from "../fiches-diagnostic/types";
import { makeFicheDiagnosticUrlApi } from "../fiches-diagnostic/helpers";

const IMAGE_SLICE_INDEX = 5;

export const TableauDeBordFichesDiagnoscticImages = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const selectedFichesDiagnostic = projet?.fiches_diagnostic_id;
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
  const selectedFichesSolutions = projet?.fiches_solutions_id;
  return <TableauDeBordSFicheImages typeFiche={TypeFiche.solution} selectedFichesIds={selectedFichesSolutions} />;
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
  const { data } = useImmutableSwrWithFetcher<FicheSolutionResponse[]>(
    makeFicheSolutionCompleteUrlApi(ficheSolutionId),
  );
  const ficheSolution = data && data[0];
  return <TableauSuiviFicheImages image={ficheSolution?.attributes.image_principale} />;
};

export const TableauDeBordFicheDiagnosticImage = ({ ficheDiagnosticId }: { ficheDiagnosticId: string }) => {
  const { data } = useImmutableSwrWithFetcher<FicheDiagnosticResponse>(makeFicheDiagnosticUrlApi(ficheDiagnosticId));
  return <TableauSuiviFicheImages image={data?.attributes.image_principale} />;
};

const TableauSuiviFicheImages = ({ image }: { image: APIResponse<"plugin::upload.file"> | null | undefined }) => {
  return (
    <div className="mr-2 h-10 w-10 shrink-0 overflow-hidden rounded-[50%]">
      <Image
        className="h-10 w-10 object-cover"
        alt="image"
        width={48}
        height={48}
        sizes="30vw md:5vw"
        src={getStrapiImageUrl(image, STRAPI_IMAGE_KEY_SIZE.small)}
      />
    </div>
  );
};
