import Image from "next/image";
import FicheSolutionSmallHorizontalCard from "@/src/components/ficheSolution/FicheSolutionSmallHorizontalCard";
import CmsRichText from "@/src/components/common/CmsRichText";
import { APIResponseData } from "@/src/lib/strapi/types/types";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";

type SolutionRetourExperienceCardProps = {
  solution: APIResponseData<"api::solution-retour-experience.solution-retour-experience">;
  className?: string;
  displayFicheSolutionCard?: boolean;
};

export default async function SolutionRetourExperienceCard({
  solution,
  className,
  displayFicheSolutionCard,
}: SolutionRetourExperienceCardProps) {
  return (
    <div className={className}>
      <div className={`flex max-w-3xl md:gap-12 ${className}`}>
        <div className="relative h-32 w-32 flex-none">
          <Image
            fill
            sizes="(max-width: 768px) 80vw, 20vw"
            className="rounded-full object-cover"
            src={getStrapiImageUrl(solution.attributes.image, STRAPI_IMAGE_KEY_SIZE.small)}
            alt={solution.attributes.titre}
          />
        </div>
        <div className="ml-4 grow">
          <div className="text-xl font-bold">{solution.attributes.titre}</div>
          <CmsRichText label={solution.attributes.description || ""} />
          {!displayFicheSolutionCard && solution.attributes.fiche_solution?.data && (
            <FicheSolutionSmallHorizontalCard
              ficheSolution={solution.attributes.fiche_solution}
              className={"mb-4 hidden md:flex"}
            />
          )}
        </div>
      </div>
      {!displayFicheSolutionCard && solution.attributes.fiche_solution?.data && (
        <FicheSolutionSmallHorizontalCard
          ficheSolution={solution.attributes.fiche_solution}
          className={"mb-9 block md:hidden"}
        />
      )}
    </div>
  );
}
