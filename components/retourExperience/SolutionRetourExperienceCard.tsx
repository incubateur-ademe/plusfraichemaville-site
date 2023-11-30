import { DIRECTUS_IMAGE_KEY_SIZE, getDirectusImageUrl } from "@/lib/directus/directusClient";
import Image from "next/image";
import { SolutionRetourExperience } from "@/lib/directus/directusModels";

export default async function SolutionRetourExperienceCard({
  solution,
  className,
}: {
  solution: SolutionRetourExperience;
  className?: string;
}) {
  return (
    <div className={`max-w-3xl flex ${className}`}>
      <div className="relative h-32 w-32 flex-none">
        <Image
          fill={true}
          className="rounded-full"
          src={getDirectusImageUrl(solution.image, DIRECTUS_IMAGE_KEY_SIZE.ficheSolutionCard)}
          alt={solution.titre || ""}
        />
      </div>
      <div className="grow ml-4 md:ml-12">
        <div className="text-xl font-bold">{solution.titre}</div>
        <div className="cmsRichText" dangerouslySetInnerHTML={{ __html: solution.description }} />
      </div>
    </div>
  );
}
