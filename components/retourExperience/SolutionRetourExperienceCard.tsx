import { DIRECTUS_ASSET_URL } from "@/lib/directus/directusClient";
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
          src={DIRECTUS_ASSET_URL + solution.image + "?key=fiche-technique-card"}
          alt={solution.titre || ""}
        />
      </div>
      <div className="grow md:ml-12">
        <div className="text-xl font-bold">{solution.titre}</div>
        <div dangerouslySetInnerHTML={{ __html: solution.description }} />
      </div>
    </div>
  );
}
