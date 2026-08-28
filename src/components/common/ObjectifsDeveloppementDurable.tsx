import Image from "next/image";
import { ObjectifDeveloppementDurable } from "@/src/lib/strapi/types/api/objectif-developpement-durable";

export default function ObjectifsDeveloppementDurable({
  objectifs,
  imageSize = 100,
}: {
  objectifs: ObjectifDeveloppementDurable[] | undefined;
  imageSize?: number;
}) {
  if (objectifs && objectifs.length > 0) {
    return (
      <div>
        <div className={"font-bold"}>Objectifs du Développement Durable</div>
        <div className={"flex flex-wrap gap-2"}>
          {objectifs.map((odd) => (
            <Image
              key={odd.numero}
              src={`/images/odd/odd${odd.numero}.svg`}
              alt={odd.description || ""}
              title={odd.description || ""}
              width={imageSize}
              height={imageSize}
              className={"rounded-xl"}
            />
          ))}
        </div>
      </div>
    );
  }
}
