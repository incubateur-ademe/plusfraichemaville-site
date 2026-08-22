import { RetourExperienceDiag } from "@/src/components/retour-experience-diag/retour-experience-diag";
import {
  getRetourExperienceDiagBySlug,
  getRetoursExperiencesDiag,
} from "@/src/lib/strapi/queries/retour-experience-diag-queries";
import { notFound } from "next/navigation";
import SiteVitrineBreadcrumb from "@/src/components/common/site-vitrine-breadcumb/site-vitrine-breadcrumb";
import { BREADCRUMB_SURCHAUFFE_URBAINE_REX } from "@/src/components/common/site-vitrine-breadcumb/site-vitrine-breadcumb-list";
import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { stripHtmlTags } from "@/src/helpers/common";

type RetourExperienceDiagPageProps = {
  params: Promise<{ rexSlug: string }>;
};

export async function generateStaticParams() {
  const allRexDiag = await getRetoursExperiencesDiag();
  return allRexDiag.map((rexDiag) => ({
    rexSlug: rexDiag.slug || "",
  }));
}

export async function generateMetadata(props: RetourExperienceDiagPageProps): Promise<Metadata> {
  const params = await props.params;
  const rexDiag = await getRetourExperienceDiagBySlug(params.rexSlug);
  return computeMetadata(
    rexDiag?.titre || "Diagnostic réalisé",
    stripHtmlTags(rexDiag?.description || ""),
    getStrapiImageUrl(rexDiag?.image_principale, STRAPI_IMAGE_KEY_SIZE.medium),
  );
}

export default async function RetourExperienceDiagPage(props: RetourExperienceDiagPageProps) {
  const params = await props.params;
  const rex = await getRetourExperienceDiagBySlug(params.rexSlug);

  if (!rex) {
    customCaptureException(
      `Retour expérience diagnostic non trouvé ${params.rexSlug}`,
      new Error("Rex diagnostic non trouvé"),
    );
    notFound();
  }

  return (
    <>
      <div className="fr-container">
        <SiteVitrineBreadcrumb step={BREADCRUMB_SURCHAUFFE_URBAINE_REX(rex.lieu)} />
      </div>
      <RetourExperienceDiag rex={rex} showContacts={false} />
    </>
  );
}
