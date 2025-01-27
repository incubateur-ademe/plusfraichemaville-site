import Image from "next/image";
import { ObjectifDeveloppementDurable } from "@/src/lib/strapi/types/api/objectif-developpement-durable";

export default function ObjectifsDeveloppementDurable({
  objectifs,
  imageSize = 100,
  className,
}: {
  objectifs: ObjectifDeveloppementDurable[] | undefined;
  imageSize?: number;
  className?: string;
}) {
  if (objectifs && objectifs.length > 0) {
    return (
      <div className={className}>
        <div className={"font-bold"}>Objectifs du Développement Durable</div>
        <div className={"flex flex-wrap"}>
          {objectifs.map((odd) => (
            <Image
              key={odd.attributes.numero}
              src={`/images/odd/odd${odd.attributes.numero}.svg`}
              alt={odd.attributes.description || ""}
              title={odd.attributes.description || ""}
              width={imageSize}
              height={imageSize}
              className={"mb-2 mr-2 rounded-md"}
            />
          ))}
        </div>
      </div>
    );
  }
}
