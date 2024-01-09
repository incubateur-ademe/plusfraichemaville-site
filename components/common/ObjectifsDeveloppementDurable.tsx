import Image from "next/image";
import { APIResponseData } from "@/lib/strapi/types/types";

export default async function ObjectifsDeveloppementDurable({
  objectifs,
  imageSize = 100,
  className,
}: {
  objectifs: APIResponseData<"api::objectif-developpement-durable.objectif-developpement-durable">[] | undefined;
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
              className={"rounded-md mr-2 mb-2"}
            />
          ))}
        </div>
      </div>
    );
  }
}
