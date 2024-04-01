import { getRetourExperienceBySlug } from "@/lib/strapi/queries/retoursExperienceQueries";
import { homepageData } from "./homepage-data";
import RetourExperienceCard from "@/components/retourExperience/RetourExperienceCard";
import Image from "next/image";
import { STRAPI_IMAGE_KEY_SIZE, getStrapiImageUrl } from "@/lib/strapi/strapiClient";
import Link from "next/link";
import { PFMV_ROUTES } from "@/helpers/routes";
import clsx from "clsx";
import CmsRichText from "@/components/common/CmsRichText";

export const HomepageInspirer = () => {
  const { inspirer } = homepageData;
  return (
    <div className="w-fit mx-auto pb-20">
      <h3 className="px-10 lg:px-0 text-pfmv-navy text-lg lg:text-[26px] font-bold my-10 lg:my-14 text-center">
        {inspirer.title}
      </h3>
      <HomepageInspirerCard slug={inspirer.featuredRex} featured />
      <div className="flex gap-8 lg:flex-row flex-col items-center">
        {inspirer.otherRex.map((rex, index) => (
          <HomepageInspirerCard slug={rex} key={index} />
        ))}
      </div>
      <Link
        className={clsx(
          "fr-btn fr-btn--secondary mt-10 mx-auto rounded-3xl !block",
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
    <>
      <RetourExperienceCard retourExperience={rex} className="flex lg:hidden mx-auto mb-8" />
      <Link
        href={`${PFMV_ROUTES.RETOURS_EXPERIENCE}/${rex.attributes.slug}`}
        className="hidden lg:inline-block !bg-none"
      >
        <div className="flex gap-8 pfmv-card px-8 max-w-[78rem] mb-10">
          <div className="w-[427px] py-10 shrink-0 relative flex justify-center items-center">
            <Image
              src={getStrapiImageUrl(rex?.attributes.image_principale, STRAPI_IMAGE_KEY_SIZE.large)}
              alt={rex.attributes.image_principale?.data.attributes.alternativeText ?? "image collectivité"}
              className="object-cover w-full h-auto"
              sizes="50vw"
              width={0}
              height={0}
            />
          </div>
          <div className="py-12">
            <h4 className="font-bold text-2xl mb-4">{rex.attributes.titre}</h4>
            <CmsRichText label={rex.attributes.description} />
            <div
              className={clsx(
                "text-pfmv-navy font-bold !bg-none hover:text-dsfr-background-action-high-blue-france-active",
              )}
            >
              Lire la suite
            </div>
          </div>
        </div>
      </Link>
    </>
  ) : (
    <RetourExperienceCard retourExperience={rex} />
  );
};
