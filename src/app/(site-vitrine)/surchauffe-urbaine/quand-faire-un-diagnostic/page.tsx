import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { TeaserDiagnosticComponent } from "@/src/components/surchauffe-urbaine/teaser-diagnostic-component";
// eslint-disable-next-line max-len
import { SurchauffeUrbaineTimingComponent } from "@/src/components/surchauffe-urbaine/surchauffe-urbaine-timing-component";
import SiteVitrineBreadcrumb from "@/src/components/common/site-vitrine-breadcumb/site-vitrine-breadcrumb";
// eslint-disable-next-line max-len
import { BREADCRUMB_SURCHAUFFE_URBAINE_TIMING } from "@/src/components/common/site-vitrine-breadcumb/site-vitrine-breadcumb-list";

export const metadata: Metadata = computeMetadata("Pourquoi et quand faire un diagnostic ?");

export default async function SurchauffeUrbaineTimingPage() {
  return (
    <>
      <div className="fr-container">
        <SiteVitrineBreadcrumb step={BREADCRUMB_SURCHAUFFE_URBAINE_TIMING} />
        <h1 className="mt-8 text-center text-[1.75rem] font-bold text-dsfr-text-title-grey">
          Pourquoi et quand faire un diagnostic ?
        </h1>
        <div className="mx-auto max-w-[43rem] text-center  text-lg">
          Le diagnostic de la surchauffe urbaine est une étape essentielle, quelle que soit l’échelle de votre projet.
        </div>
      </div>
      <SurchauffeUrbaineTimingComponent className="mt-12" />
      <TeaserDiagnosticComponent className="mt-12" />
    </>
  );
}
