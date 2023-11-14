import Image from "next/image";
import { DIRECTUS_ASSET_URL } from "@/lib/directus/directusClient";
import { getRetourExperienceBySlug } from "@/lib/directus/queries/retoursExperienceQueries";
import CustomDSFRQuote from "@/components/customDSFR/CustomDSFRQuote";
import SituationRetourExperience from "@/components/retourExperience/SituationRetourExperience";

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
            {retourExperience.citation?.length > 0 &&
              retourExperience.citation.map((citation) => (
                <CustomDSFRQuote
                  key={citation.auteur}
                  texte={citation.texte}
                  auteur={citation.auteur}
                  className="mt-12"
                />
              ))}
            <div className="flex flex-col md:flex-row mt-4">
              {retourExperience.situation_avant && (
                <SituationRetourExperience
                  texte={retourExperience.situation_avant.description}
                  image={retourExperience.situation_avant.image}
                  titre="Avant le projet"
                  className="m-3 flex-1 bg-dsfr-background-grey"
                />
              )}
              {retourExperience.situation_apres && (
                <SituationRetourExperience
                  texte={retourExperience.situation_apres.description}
                  image={retourExperience.situation_apres.image}
                  titre="Après le projet"
                  className="m-3 flex-1 bg-dsfr-background-blue-cumulus"
                />
              )}
            </div>
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
