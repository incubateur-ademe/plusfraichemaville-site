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
      <div className="relative h-36 w-36 flex-none">
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
    // <div className={`fr-card fr-card--no-border fr-card--shadow rounded-2xl ${className} max-w-md`}>
    //   <div className="fr-card__body">
    //     <div className="fr-card__content">
    //       <h3 className="fr-card__title">{solution.titre}</h3>
    //       <div className="fr-card__desc h-full">
    //         <div className={"flex justify-between flex-col h-full"}>
    //           <div dangerouslySetInnerHTML={{ __html: solution.description }} />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="fr-card__header">
    //     <div className="fr-card__img">
    //       <Image
    //         width={600}
    //         height={300}
    //         className="w-full h-52 object-cover rounded-t-2xl"
    //         src={DIRECTUS_ASSET_URL + solution.image + "?key=fiche-technique-card"}
    //         alt={solution.titre || ""}
    //       />
    //     </div>
    //   </div>
    // </div>
  );
}
