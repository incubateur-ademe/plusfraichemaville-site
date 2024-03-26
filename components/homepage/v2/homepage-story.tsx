/* eslint-disable no-undef */

import { PFMV_ROUTES } from "@/helpers/routes";
import { getTypeSolutionFromCode } from "@/helpers/typeSolution";
import { getFicheSolutionBySlug } from "@/lib/strapi/queries/fichesSolutionsQueries";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/lib/strapi/strapiClient";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export const HomepageStory = async ({ slug }: { slug: string }) => {
  const ficheSolution = await getFicheSolutionBySlug(slug);
  const typeSolution = getTypeSolutionFromCode(ficheSolution?.attributes.type_solution);

  return (
    <div>
      <Link href={`${PFMV_ROUTES.FICHES_SOLUTIONS}/${slug}`}>
        <div
          className={clsx(
            "w-[358px] h-[540px] shrink-0 rounded-3xl flex justify-end flex-col px-8 py-5",
            "relative overflow-hidden",
            `gradient-solution-${typeSolution?.code}`,
          )}
        >
          {typeSolution && (
            <div className="flex text-xs mb-2 text-white">
              {typeSolution.icon("fr-icon--sm mr-2 mb-auto")}
              <span className="mt-[1px]">{typeSolution.label}</span>
            </div>
          )}
          <h4 className="text-white">{ficheSolution?.attributes.titre}</h4>
          <Image
            src={getStrapiImageUrl(ficheSolution?.attributes.image_principale, STRAPI_IMAGE_KEY_SIZE.large)}
            alt={ficheSolution?.attributes.image_principale?.data.attributes.alternativeText ?? ""}
            fill
            objectFit="cover"
            className="-z-10"
          />
        </div>
      </Link>
    </div>
  );
};
