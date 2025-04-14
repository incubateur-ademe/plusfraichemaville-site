import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { TeaserDiagnosticComponent } from "@/src/components/surchauffe-urbaine/teaser-diagnostic-component";
// eslint-disable-next-line max-len
import { SurchauffeUrbaineNotionsComponent } from "@/src/components/surchauffe-urbaine/surchauffe-urbaine-notions-component";
import SiteVitrineBreadcrumb from "@/src/components/common/site-vitrine-breadcumb/site-vitrine-breadcrumb";
import { BREADCRUMB_SURCHAUFFE_URBAINE_COMPRENDRE } from "@/src/components/common/site-vitrine-breadcumb/site-vitrine-breadcumb-list";

export const metadata: Metadata = computeMetadata("Notions clés de la surchauffe urbaine");

export default async function SurchauffeUrbaineNotionsClesPage() {
  return (
    <>
      <div className="fr-container">
        <SiteVitrineBreadcrumb step={BREADCRUMB_SURCHAUFFE_URBAINE_COMPRENDRE} />
        <h1 className="mt-8 text-center text-[1.75rem] font-bold text-dsfr-text-title-grey">
          Comprendre la surchauffe urbaine
        </h1>
        <div className="mx-auto max-w-[51rem] text-center text-lg">
          {"Pour bien comprendre la surchauffe urbaine, il convient d'explorer deux notions complémentaires. Bien " +
            "sûr, il est pertinent de considérer le phénomène climatique qui la sous-tend, connu sous le nom d’îlot " +
            "de chaleur urbain. Mais attention ! S'intéresser à la température ressentie par les habitants est tout " +
            "aussi important."}
        </div>
      </div>
      <SurchauffeUrbaineNotionsComponent className="mt-12" />
      <TeaserDiagnosticComponent className="mt-12" />
    </>
  );
}
