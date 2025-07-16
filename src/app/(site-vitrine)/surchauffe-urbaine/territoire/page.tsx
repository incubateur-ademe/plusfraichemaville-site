import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { TeaserDiagnosticComponent } from "@/src/components/surchauffe-urbaine/teaser-diagnostic-component";
import SiteVitrineBreadcrumb from "@/src/components/common/site-vitrine-breadcumb/site-vitrine-breadcrumb";
import { BREADCRUMB_SURCHAUFFE_URBAINE_TERRITOIRE } from "@/src/components/common/site-vitrine-breadcumb/site-vitrine-breadcumb-list";
import { SurchauffeUrbaineTerritoireSearch } from "@/src/components/surchauffe-urbaine/territoire/surchauffe-urbaine-territoire-search";
import { getPublicClimadiagInfoFromCodeInsee } from "@/src/lib/prisma/prisma-climadiag-queries";
import { mapClimadiagToCollectiteOption } from "@/src/components/surchauffe-urbaine/territoire/search-helpers";
import { SurchauffeUrbaineClimadiag } from "@/src/components/surchauffe-urbaine/territoire/surchauffe-urbaine-climadiag";
import { Climadiag } from "@/src/components/climadiag/types";
import LCZMapContainer from "@/src/components/surchauffe-urbaine/territoire/surchauffe-urbaine-lcz-map-container";

export const metadata: Metadata = computeMetadata("Impact de la surchauffe urbaine sur votre territoire");

const LCZ_PERCENTAGE_COVERAGE_THRESHOLD = 5;
const displayLCZ = process.env.NEXT_PUBLIC_FEATURE_LCZ === "true" || false;

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
        <SiteVitrineBreadcrumb step={BREADCRUMB_SURCHAUFFE_URBAINE_TERRITOIRE(climadiagResult?.nom)} />
        <SurchauffeUrbaineTerritoireSearch
          initialOption={mapClimadiagToCollectiteOption(climadiagResult)}
          className="mt-6"
        />
        {displayLCZ && climadiagResult && climadiagResult.couverture_lcz > LCZ_PERCENTAGE_COVERAGE_THRESHOLD && (
          <LCZMapContainer climadiagInfo={climadiagResult as unknown as Climadiag} />
        )}
        {climadiagResult && (
          <SurchauffeUrbaineClimadiag climadiagInfo={climadiagResult as unknown as Climadiag} className="mt-6" />
        )}
        <TeaserDiagnosticComponent className="mt-12" />
      </div>
    </>
  );
}
