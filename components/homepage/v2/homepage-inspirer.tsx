import { getRetourExperienceBySlug } from "@/lib/strapi/queries/retoursExperienceQueries";
import { homepageData } from "./homepage-data";
import RetourExperienceCard from "@/components/retourExperience/RetourExperienceCard";
import Image from "next/image";
import { STRAPI_IMAGE_KEY_SIZE, getStrapiImageUrl } from "@/lib/strapi/strapiClient";
import Link from "next/link";
import { PFMV_ROUTES } from "@/helpers/routes";
import clsx from "clsx";

export const HomepageInspirer = () => {
  const { inspirer } = homepageData;
  return (
    <div>
      <h3 className="text-pfmv-navy text-[26px] font-bold my-14 text-center">{inspirer.title}</h3>
      <HomepageInspirerCard slug={inspirer.featuredRex} featured />
      {inspirer.otherRex.map((rex, index) => (
        <HomepageInspirerCard slug={rex} key={index} />
      ))}
      <Link
        className={clsx(
          "fr-btn fr-btn--secondary mx-auto rounded-3xl !block",
          "!shadow-none text-pfmv-navy border-[1px] border-pfmv-navy",
        )}
        href={inspirer.cta.url}
      >
        {inspirer.cta.label}
      </Link>
    </div>
  );
};

export const HomepageInspirerCard = async ({ slug, featured = false }: { slug: string; featured?: boolean }) => {
  const rex = await getRetourExperienceBySlug(slug);

  if (!rex) {
    return null;
  }

  return featured ? (
    <div className="flex pfmv-card">
      <div className="w-[427px] h-[277px]">
        <Image
          src={getStrapiImageUrl(rex?.attributes.image_principale, STRAPI_IMAGE_KEY_SIZE.large)}
          alt={rex.attributes.image_principale?.data.attributes.alternativeText ?? "image collectivité"}
          fill
        />
      </div>
      <div>
        <h4 className="font-bold text-2xl mb-4">{rex.attributes.titre}</h4>
        <p className="mb-10">{rex.attributes.description}</p>
        <Link href={`${PFMV_ROUTES.RETOURS_EXPERIENCE}/${rex.attributes.slug}`} className="text-pfmv-navy font-bold">
          Lire la suite
        </Link>
      </div>
    </div>
  ) : (
    <RetourExperienceCard retourExperience={rex} />
  );
};
