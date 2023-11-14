import Image from "next/image";
import { DIRECTUS_ASSET_URL } from "@/lib/directus/directusClient";
import { getRetourExperienceBySlug } from "@/lib/directus/queries/retoursExperienceQueries";

export default async function RetourExperience({ params }: { params: { retourExperienceSlug: string } }) {
  const retourExperience = await getRetourExperienceBySlug(params.retourExperienceSlug);
  if (retourExperience) {
    return (
      <>
        <div className="h-max">
          <Image
            width={1200}
            height={500}
            className="w-full max-h-64 object-cover block"
            src={DIRECTUS_ASSET_URL + retourExperience.image_principale}
            alt={retourExperience?.titre || "image titre"}
          />
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="md:flex-none md:w-64 bg-dsfr-background-yellow">
            BLABLA
            <br />
            BLABLA
            <br />
            BLABLA
            <br />
            BLABLA
            <br />
          </div>
          <div className="flex-1 md:pl-4">
            <h1 className={"mt-8"}>{retourExperience.titre}</h1>
            <div
              className="text-xl leading-8"
              dangerouslySetInnerHTML={{ __html: retourExperience.description || "" }}
            ></div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1>Projet non trouvé...</h1>
      </>
    );
  }
}
