import { FicheDiagnostic } from "@/src/components/fiches-diagnostic/fiche-diagnostic";
import { getAllFichesDiagnostic, getFicheDiagnosticBySlug } from "@/src/lib/strapi/queries/fiches-diagnostic-queries";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { computeMetadata } from "@/src/helpers/metadata/helpers";

type FicheDiagnosticPageProps = {
  params: { ficheDiagnosticSlug: string };
};

export async function generateStaticParams() {
  const allFichesDiagnostic = await getAllFichesDiagnostic();
  return allFichesDiagnostic.map((ficheDiagnostic) => ({
    ficheDiagnosticSlug: ficheDiagnostic.attributes.slug || "",
  }));
}

export async function generateMetadata({ params }: FicheDiagnosticPageProps): Promise<Metadata> {
  const ficheDiagnostic = await getFicheDiagnosticBySlug(params.ficheDiagnosticSlug);
  return computeMetadata(
    ficheDiagnostic?.attributes.titre || "Fiche diagnostic",
    ficheDiagnostic?.attributes.description_courte,
    getStrapiImageUrl(ficheDiagnostic?.attributes.image_principale, STRAPI_IMAGE_KEY_SIZE.medium),
  );
}

export default async function FicheDiagnosticPage({ params }: { params: { ficheDiagnosticSlug: string } }) {
  const ficheDiagnostic = await getFicheDiagnosticBySlug(params.ficheDiagnosticSlug);

  if (!ficheDiagnostic) {
    return notFound();
  }
  return <FicheDiagnostic ficheDiagnostic={ficheDiagnostic} />;
}
