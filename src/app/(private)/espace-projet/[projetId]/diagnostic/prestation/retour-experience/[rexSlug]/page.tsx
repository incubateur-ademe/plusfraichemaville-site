import { RetourExperienceDiag } from "@/src/components/retour-experience-diag/retour-experience-diag";
import { getRetourExperienceDiagBySlug } from "@/src/lib/strapi/queries/retour-experience-diag-queries";
import { notFound } from "next/navigation";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";
import { BREADCRUMB_DIAG_REX } from "@/src/components/espace-projet/banner/breadcrumb-list/espace-projet-breadcurmb-diag";

type RetourExperienceDiagPageProps = {
  params: Promise<{ rexSlug: string }>;
};

export default async function RetourExperienceDiagPage(props: RetourExperienceDiagPageProps) {
  const params = await props.params;
  const rex = await getRetourExperienceDiagBySlug(params.rexSlug);

  if (!rex) {
    notFound();
  }

  return (
    <>
      <BannerProjetBreadcrumb step={BREADCRUMB_DIAG_REX} />
      <RetourExperienceDiag rex={rex} showContacts />
    </>
  );
}
