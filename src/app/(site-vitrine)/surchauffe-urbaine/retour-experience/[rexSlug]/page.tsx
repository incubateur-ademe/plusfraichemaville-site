import { RetourExperienceDiag } from "@/src/components/retour-experience-diag/retour-experience-diag";
import { getRetourExperienceDiagBySlug } from "@/src/lib/strapi/queries/retour-experience-diag-queries";
import { notFound } from "next/navigation";
import SiteVitrineBreadcrumb from "@/src/components/common/site-vitrine-breadcumb/site-vitrine-breadcrumb";
// eslint-disable-next-line max-len
import { BREADCRUMB_SURCHAUFFE_URBAINE_REX } from "@/src/components/common/site-vitrine-breadcumb/site-vitrine-breadcumb-list";

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
      <div className="fr-container">
        <SiteVitrineBreadcrumb step={BREADCRUMB_SURCHAUFFE_URBAINE_REX(rex.attributes.lieu)} />
      </div>
      <RetourExperienceDiag rex={rex} showContacts={false} />
    </>
  );
}
