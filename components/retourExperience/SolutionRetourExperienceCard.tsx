import { DIRECTUS_IMAGE_KEY_SIZE, getDirectusImageUrl } from "@/lib/directus/directusClient";
import Image from "next/image";
import FicheSolutionSmallHorizontalCard from "@/components/ficheSolution/FicheSolutionSmallHorizontalCard";
import CmsRichText from "@/components/common/CmsRichText";
import { APIResponseData } from "@/lib/strapi/types/types";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/lib/strapi/strapiClient";

export default async function SolutionRetourExperienceCard({
  solution,
  className,
}: {
  solution: APIResponseData<"api::solution-retour-experience.solution-retour-experience">;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className={`max-w-3xl flex ${className}`}>
        <div className="relative h-32 w-32 flex-none">
          <Image
            fill={true}
            className="rounded-full"
            src={getStrapiImageUrl(solution.attributes.image, STRAPI_IMAGE_KEY_SIZE.small)}
            alt={solution.attributes.titre}
          />
        </div>
        <div className="grow ml-4 md:ml-12">
          <div className="text-xl font-bold">{solution.attributes.titre}</div>
          <CmsRichText label={solution.attributes.description || ""} />
          {solution.attributes.fiche_solution && (
            <FicheSolutionSmallHorizontalCard
              ficheSolution={solution.attributes.fiche_solution}
              className={"mb-4 hidden md:flex"}
            />
          )}
        </div>
      </div>
      {solution.attributes.fiche_solution && (
        <FicheSolutionSmallHorizontalCard ficheSolution={solution.attributes.fiche_solution} className={"mb-9 block md:hidden"} />
      )}
    </div>
  );
}
