import Image from "next/image";
import CustomDSFRQuote from "@/src/components/common/CustomDSFRQuote";
import SituationRetourExperienceCard from "@/src/components/retourExperience/SituationRetourExperienceCard";
import CalendrierRetourExperienceAccordion from "@/src/components/retourExperience/CalendrierRetourExperienceAccordion";
import ItemRetourExperience from "@/src/components/retourExperience/ItemRetourExperience";
import RetourExperienceExtraInfoPanel from "@/src/components/retourExperience/RetourExperienceExtraInfoPanel";
import { notFound } from "next/navigation";
import CmsRichText from "@/src/components/common/CmsRichText";
import { getRetourExperienceBySlug } from "@/src/lib/strapi/queries/retoursExperienceQueries";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import RetourExperienceCard from "@/src/components/retourExperience/RetourExperienceCard";
import SolutionRetourExperienceCard from "@/src/components/retourExperience/SolutionRetourExperienceCard";
import { getCreditsImageForRetourExperience } from "@/src/helpers/credits-image";

export async function RetourExperience({ params }: { params: { retourExperienceSlug: string; projetId: string } }) {
  const retourExperience = await getRetourExperienceBySlug(params.retourExperienceSlug);

  if (retourExperience) {
    const creditsImage = getCreditsImageForRetourExperience(retourExperience.attributes);
    const solutions = retourExperience.attributes.solution_retour_experiences?.data;
    const linkedRetourExperiences = retourExperience.attributes.retour_experiences?.data;
    return (
      <>
        <div className="h-max">
          <Image
            width={1920}
            height={384}
            className="block max-h-40 w-full object-cover md:max-h-96"
            src={getStrapiImageUrl(retourExperience.attributes.image_principale, STRAPI_IMAGE_KEY_SIZE.large)}
            alt={retourExperience.attributes.titre || "image titre"}
          />
        </div>
        <div className="fr-container flex flex-col md:flex-row">
          <RetourExperienceExtraInfoPanel retourExperience={retourExperience} />
          <div className="flex-1 md:pl-12">
            <h1 className={"mt-4 text-3xl md:text-[40px] md:leading-[3rem]"}>{retourExperience.attributes.titre}</h1>
            <CmsRichText label={retourExperience.attributes.description} className={"mt-10 text-xl leading-8"} />
            {retourExperience.attributes.citations &&
              retourExperience.attributes.citations.length > 0 &&
              retourExperience.attributes.citations.map((citation) => (
                <CustomDSFRQuote key={citation.auteur} citation={citation} className="mt-12" />
              ))}
            <div className="mt-10 flex flex-col md:flex-row">
              <SituationRetourExperienceCard
                titre="Avant le projet"
                situation={retourExperience.attributes.situation_avant}
                className="mb-4 flex-1 bg-dsfr-background-alt-grey md:mb-0 md:mr-3"
              />
              <SituationRetourExperienceCard
                titre="Après le projet"
                situation={retourExperience.attributes.situation_apres}
                className="flex-1 bg-dsfr-background-alt-blue-france md:ml-3"
              />
            </div>
            {solutions && solutions.length > 0 && (
              <>
                <h2 className="mb-6 mt-10 text-3xl">Solutions réalisées</h2>
                {solutions.map((solution) => (
                  <SolutionRetourExperienceCard solution={solution} key={solution.id} className="mb-4" />
                ))}
              </>
            )}
            {retourExperience.attributes.calendrier && retourExperience.attributes.calendrier.length > 0 && (
              <div className="fr-accordions-group">
                <h2 className="mb-6 mt-10 text-3xl">Calendrier</h2>
                <CalendrierRetourExperienceAccordion etapes={retourExperience.attributes.calendrier} />
              </div>
            )}
            <ItemRetourExperience
              title="Budget et financements"
              content={retourExperience.attributes.financement}
              level="title"
            />
            <ItemRetourExperience
              title="Difficultés rencontrées"
              content={retourExperience.attributes.difficultes}
              level="title"
            />
            {(retourExperience.attributes.partenaires ||
              retourExperience.attributes.ressources ||
              retourExperience.attributes.credits) && (
              <>
                <h2 className="mb-4 mt-10 text-3xl">Pour en savoir plus</h2>
                <ItemRetourExperience
                  title="Partenaires"
                  content={retourExperience.attributes.partenaires}
                  level="subtitle"
                />
                <ItemRetourExperience
                  title="Ressources"
                  content={retourExperience.attributes.ressources}
                  level="subtitle"
                />
                <ItemRetourExperience title="Crédits" content={retourExperience.attributes.credits} level="subtitle" />
              </>
            )}
            {!!(linkedRetourExperiences && linkedRetourExperiences.length > 0) && (
              <>
                <h2 className="mb-3 mt-10 text-3xl">Découvrir d{"'"}autres projets réalisés</h2>
                <ul className="flex grow list-none flex-wrap gap-6 p-0">
                  {retourExperience.attributes.retour_experiences?.data.map((rex) => (
                    <li key={rex.id}>
                      <RetourExperienceCard retourExperience={rex} />
                    </li>
                  ))}
                </ul>
              </>
            )}
            {creditsImage.length > 0 && (
              <>
                <hr className="mt-12 pb-8" />
                <div className="mb-4 font-bold text-dsfr-text-title-grey">Crédits images</div>
                <div>{creditsImage.join(", ")}</div>
              </>
            )}
          </div>
        </div>
      </>
    );
  } else {
    notFound();
  }
}
