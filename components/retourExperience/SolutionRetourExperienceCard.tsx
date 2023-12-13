import { DIRECTUS_IMAGE_KEY_SIZE, getDirectusImageUrl } from "@/lib/directus/directusClient";
import Image from "next/image";
import { SolutionRetourExperience } from "@/lib/directus/directusModels";
import FicheSolutionSmallVerticalCard from "@/components/ficheSolution/FicheSolutionSmallVerticalCard";
import CmsRichText from "@/components/common/CmsRichText";

export default async function SolutionRetourExperienceCard({
  solution,
  className,
}: {
  solution: SolutionRetourExperience;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className={`max-w-3xl flex ${className}`}>
        <div className="relative h-32 w-32 flex-none">
          <Image
            fill={true}
            className="rounded-full"
            src={getDirectusImageUrl(solution.image, DIRECTUS_IMAGE_KEY_SIZE.retourExperienceSolutionThumbnail)}
            alt={solution.titre || ""}
          />
        </div>
        <div className="grow ml-4 md:ml-12">
          <div className="text-xl font-bold">{solution.titre}</div>
          <CmsRichText label={solution.description} />
          {solution.fiche_solution && (
            <FicheSolutionSmallVerticalCard ficheSolution={solution.fiche_solution} className={"mb-4 hidden md:flex"} />
          )}
        </div>
      </div>
      {solution.fiche_solution && (
        <FicheSolutionSmallVerticalCard ficheSolution={solution.fiche_solution} className={"mb-9 block md:hidden"} />
      )}
    </div>
  );
}
