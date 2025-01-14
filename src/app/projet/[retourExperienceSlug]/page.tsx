import { RetourExperienceServer } from "@/src/components/projet/projet-retour-experience-server";
import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { getRetourExperienceBySlug } from "@/src/lib/strapi/queries/retoursExperienceQueries";

type RetourExperiencePageProps = {
  params: Promise<{ retourExperienceSlug: string; projetId: string }>;
};

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
  return <RetourExperienceServer params={params} />;
}
