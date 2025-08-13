import { FicheDiagnosticComponent } from "@/src/components/fiches-diagnostic/fiche-diagnostic-component";
import { getAllFichesDiagnostic, getFicheDiagnosticBySlug } from "@/src/lib/strapi/queries/fiches-diagnostic-queries";
import { notFound } from "next/navigation";
import SiteVitrineBreadcrumb from "@/src/components/common/site-vitrine-breadcumb/site-vitrine-breadcrumb";
import { BREADCRUMB_SURCHAUFFE_URBAINE_FICHE_DIAG } from "@/src/components/common/site-vitrine-breadcumb/site-vitrine-breadcumb-list";
import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";

type PageProps = {
  params: Promise<{ ficheDiagnosticSlug: string }>;
};

export async function generateStaticParams() {
  const allFichesDiagnostic = await getAllFichesDiagnostic();
  return allFichesDiagnostic.map((ficheDiagnostic) => ({
    ficheDiagnosticSlug: ficheDiagnostic.attributes.slug || "",
  }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const ficheDiagnostic = await getFicheDiagnosticBySlug(params.ficheDiagnosticSlug);
  return computeMetadata(
    ficheDiagnostic?.attributes.titre || "Méthode de diagnostic",
    ficheDiagnostic?.attributes.description_courte,
    getStrapiImageUrl(ficheDiagnostic?.attributes.image_icone, STRAPI_IMAGE_KEY_SIZE.medium),
  );
}

export default async function FicheDiagnosticSiteVitrinePage({ params }: PageProps) {
  const resolvedParams = await params;

  const ficheDiagnostic = await getFicheDiagnosticBySlug(resolvedParams.ficheDiagnosticSlug);

  if (!ficheDiagnostic) {
    return notFound();
  }

  return (
    <>
      <div className="fr-container">
        <SiteVitrineBreadcrumb step={BREADCRUMB_SURCHAUFFE_URBAINE_FICHE_DIAG} />
      </div>
      <FicheDiagnosticComponent ficheDiagnostic={ficheDiagnostic} />
    </>
  );
}
