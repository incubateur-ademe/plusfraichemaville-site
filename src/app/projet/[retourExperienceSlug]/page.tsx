import { RetourExperience } from "@/src/components/projet/projet-retour-experience";
import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { getRetourExperienceBySlug } from "@/src/lib/strapi/queries/retoursExperienceQueries";

type RetourExperiencePageProps = {
  params: { retourExperienceSlug: string; projetId: string };
};

export async function generateMetadata({ params }: RetourExperiencePageProps): Promise<Metadata> {
  const retourExperience = await getRetourExperienceBySlug(params.retourExperienceSlug);
  return computeMetadata(
    "Retour d'expérience",
    retourExperience?.attributes.titre,
    getStrapiImageUrl(retourExperience?.attributes.image_principale, STRAPI_IMAGE_KEY_SIZE.medium),
  );
}

export default async function RetourExperiencePage({ params }: RetourExperiencePageProps) {
  return <RetourExperience params={params} />;
}
