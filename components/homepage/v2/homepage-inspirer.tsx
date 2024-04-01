"use client";

import { homepageData } from "./homepage-data";
import RetourExperienceCard, { RexInHome } from "@/components/retourExperience/RetourExperienceCard";
import Image from "next/image";
import Link from "next/link";
import { PFMV_ROUTES } from "@/helpers/routes";
import clsx from "clsx";
import CmsRichText from "@/components/common/CmsRichText";

export const HomepageInspirer = () => {
  const { inspirer } = homepageData;
  return (
    <div className="w-full mx-auto pb-20 max-w-[78rem] px-5">
      <h3 className="px-10 lg:px-0 text-pfmv-navy text-lg lg:text-[26px] font-bold my-10 lg:my-14 text-center">
        {inspirer.title}
      </h3>
      <HomepageInspirerCard rex={inspirer.featuredRex} description={inspirer.featuredRex.description} featured />
      <div className="flex gap-8 lg:flex-row justify-center flex-wrap lg:flex-nowrap items-center">
        {inspirer.otherRex.map((rex, index) => (
          <HomepageInspirerCard rex={rex} key={index} />
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

export const HomepageInspirerCard = ({
  rex,
  featured = false,
  description,
}: {
  rex: (typeof homepageData.inspirer.otherRex)[number];
  description?: string;
  featured?: boolean;
}) => {
  return featured ? (
    <>
      <RetourExperienceCard retourExperience={rex as unknown as RexInHome} className="flex lg:hidden mx-auto mb-8" />
      <Link href={`${PFMV_ROUTES.RETOURS_EXPERIENCE}/${rex.slug}`} className="hidden lg:inline-block !bg-none">
        <div className="flex gap-8 pfmv-card px-8 mb-10">
          <div className="w-[427px] py-10 shrink-0 relative flex justify-center items-center">
            <Image
              src={rex.image_principale}
              alt={rex.titre}
              className="object-cover w-full h-auto"
              sizes="50vw"
              width={0}
              height={0}
            />
          </div>
          <div className="py-12">
            <h4 className="font-bold text-2xl mb-4">{rex.titre}</h4>
            {description && <CmsRichText label={description} />}
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
    <RetourExperienceCard className="w-[17.5rem]" retourExperience={rex as unknown as RexInHome} />
  );
};
