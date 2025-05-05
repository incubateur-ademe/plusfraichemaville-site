import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { TeaserDiagnosticComponent } from "@/src/components/surchauffe-urbaine/teaser-diagnostic-component";
import SiteVitrineBreadcrumb from "@/src/components/common/site-vitrine-breadcumb/site-vitrine-breadcrumb";
// eslint-disable-next-line max-len
import { BREADCRUMB_SURCHAUFFE_URBAINE_TERRITOIRE } from "@/src/components/common/site-vitrine-breadcumb/site-vitrine-breadcumb-list";
// eslint-disable-next-line max-len
import { SurchauffeUrbaineTerritoireSearch } from "@/src/components/surchauffe-urbaine/territoire/surchauffe-urbaine-territoire-search";
import { getPublicClimadiagInfoFromCodeInsee } from "@/src/lib/prisma/prisma-climadiag-queries";
import { mapClimadiagToCollectiteOption } from "@/src/components/surchauffe-urbaine/territoire/search-helpers";

export const metadata: Metadata = computeMetadata("Impact de la surchauffe urbaine sur votre territoire");

export default async function SurchauffeUrbaineTerritoirePage(props: {
  searchParams: Promise<{ codeInsee: string | undefined }>;
}) {
  const searchParams = await props.searchParams;

  const climadiagResult = searchParams.codeInsee
    ? await getPublicClimadiagInfoFromCodeInsee(searchParams.codeInsee)
    : null;
  return (
    <>
      <div className="fr-container">
        <SiteVitrineBreadcrumb step={BREADCRUMB_SURCHAUFFE_URBAINE_TERRITOIRE} />
        <SurchauffeUrbaineTerritoireSearch
          initialOption={mapClimadiagToCollectiteOption(climadiagResult)}
          className="mt-6"
        />
        <TeaserDiagnosticComponent className="mt-12" />
      </div>
    </>
  );
}
