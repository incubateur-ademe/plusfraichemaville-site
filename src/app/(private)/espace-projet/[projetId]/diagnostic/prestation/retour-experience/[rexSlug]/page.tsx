import { RetourExperienceDiag } from "@/src/components/retour-experience-diag/retour-experience-diag";
import { getRetourExperienceDiagBySlug } from "@/src/lib/strapi/queries/retour-experience-diag-queries";
import { notFound } from "next/navigation";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";
import { BREADCRUMB_DIAG_REX } from "@/src/components/espace-projet/banner/breadcrumb-list/espace-projet-breadcurmb-diag";

import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";

type RetourExperienceDiagPageProps = {
  params: Promise<{ rexSlug: string }>;
};

export async function generateMetadata(props: RetourExperienceDiagPageProps): Promise<Metadata> {
  const params = await props.params;
  const rex = await getRetourExperienceDiagBySlug(params.rexSlug);
  return computeMetadata(rex?.attributes.titre || "Retour d'expérience");
}

export default async function RetourExperienceDiagPage(props: RetourExperienceDiagPageProps) {
  const params = await props.params;
  const rex = await getRetourExperienceDiagBySlug(params.rexSlug);

  if (!rex) {
    customCaptureException(`Rex projet non trouvé ${params.rexSlug}`, new Error("Rex projet non trouvé"));
    notFound();
  }

  return (
    <>
      <BannerProjetBreadcrumb step={BREADCRUMB_DIAG_REX} />
      <RetourExperienceDiag rex={rex} showContacts />
    </>
  );
}
