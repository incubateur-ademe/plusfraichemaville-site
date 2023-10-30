import { FicheTechniqueObjectifDeveloppementDurable } from "@/lib/directus/directusModels";
import Image from "next/image";

export default async function ObjectifsDeveloppementDurable({
  objectifs,
}: {
  objectifs: FicheTechniqueObjectifDeveloppementDurable[];
}) {
  if (objectifs.length > 0) {
    return (
      <>
        <h6 className={"mt-8"}>Objectifs du Développement Durable</h6>
        <div className={"flex"}>
          {objectifs.map((odd) => (
            <Image
              key={odd.objectif_developpement_durable_id?.numero_odd}
              src={`/images/odd/odd${odd.objectif_developpement_durable_id?.numero_odd}.svg`}
              alt={odd.objectif_developpement_durable_id?.description || ""}
              width={100}
              height={100}
              className={"mr-2"}
            />
          ))}
        </div>
      </>
    );
  }
}
