import { RetourExperienceObjectifDeveloppementDurable } from "@/lib/directus/directusModels";
import Image from "next/image";

export default async function ObjectifsDeveloppementDurable({
  objectifs,
  imageSize = 100,
  className,
}: {
  objectifs: RetourExperienceObjectifDeveloppementDurable[];
  imageSize?: number;
  className?: string;
}) {
  if (objectifs.length > 0) {
    return (
      <div className={className}>
        <div>Objectifs du Développement Durable</div>
        <div className={"flex flex-wrap"}>
          {objectifs.map((odd) => (
            <Image
              key={odd.objectif_developpement_durable_id?.numero_odd}
              src={`/images/odd/odd${odd.objectif_developpement_durable_id?.numero_odd}.svg`}
              alt={odd.objectif_developpement_durable_id?.description || ""}
              title={odd.objectif_developpement_durable_id?.description || ""}
              width={imageSize}
              height={imageSize}
              className={"rounded-md mr-2 mb-2"}
            />
          ))}
        </div>
      </div>
    );
  }
}
