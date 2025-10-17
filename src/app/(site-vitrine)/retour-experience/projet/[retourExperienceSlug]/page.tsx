import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { getRetourExperienceBySlug, getRetoursExperiences } from "@/src/lib/strapi/queries/retoursExperienceQueries";
import { notFound } from "next/navigation";
import { RetourExperienceContent } from "@/src/components/projet/projet-retour-experience-content";
import SiteVitrineBreadcrumb from "@/src/components/common/site-vitrine-breadcumb/site-vitrine-breadcrumb";
import { BREADCRUMB_REX_PROJET } from "@/src/components/common/site-vitrine-breadcumb/site-vitrine-breadcumb-list";

type RetourExperiencePageProps = {
  params: Promise<{ retourExperienceSlug: string; projetId: string }>;
};

export async function generateStaticParams() {
  const allRex = await getRetoursExperiences();
  return allRex.map((rex) => ({
    rexSlug: rex.attributes.slug || "",
  }));
}

export async function generateMetadata(props: RetourExperiencePageProps): Promise<Metadata> {
  const params = await props.params;
  const retourExperience = await getRetourExperienceBySlug(params.retourExperienceSlug);
  return computeMetadata(
    "Retour d'expérience",
    retourExperience?.attributes.titre,
    getStrapiImageUrl(retourExperience?.attributes.image_principale, STRAPI_IMAGE_KEY_SIZE.medium),
  );
}

export default async function RetourExperiencePage(props: RetourExperiencePageProps) {
  const params = await props.params;
  const retourExperience = await getRetourExperienceBySlug(params.retourExperienceSlug);

  if (!retourExperience) {
    notFound();
  }

  return (
    <>
      <div className="fr-container">
        <SiteVitrineBreadcrumb step={BREADCRUMB_REX_PROJET(retourExperience.attributes.titre)} />
      </div>
      <RetourExperienceContent retourExperience={retourExperience} />
    </>
  );
}
