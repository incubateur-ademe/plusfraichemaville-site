import Image from "next/image";
import CustomDSFRQuote from "@/components/common/CustomDSFRQuote";
import SituationRetourExperienceCard from "@/components/retourExperience/SituationRetourExperienceCard";
import CalendrierRetourExperienceAccordion from "@/components/retourExperience/CalendrierRetourExperienceAccordion";
import ItemRetourExperience from "@/components/retourExperience/ItemRetourExperience";
import RetourExperienceExtraInfoPanel from "@/components/retourExperience/RetourExperienceExtraInfoPanel";
import { notFound } from "next/navigation";
import CmsRichText from "@/components/common/CmsRichText";
import { getRetourExperienceBySlug } from "@/lib/strapi/queries/retoursExperienceQueries";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/lib/strapi/strapiClient";
import RetourExperienceCard from "@/components/retourExperience/RetourExperienceCard";
import SolutionRetourExperienceCard from "@/components/retourExperience/SolutionRetourExperienceCard";

export async function RetourExperience({ params }: { params: { retourExperienceSlug: string; projetId: string } }) {
  const retourExperience = await getRetourExperienceBySlug(params.retourExperienceSlug);

  if (retourExperience) {
    const solutions = retourExperience.attributes.solution_retour_experiences?.data;
    const linkedRetourExperiences = retourExperience.attributes.retour_experiences?.data;
    return (
      <>
        <div className="h-max">
          <Image
            width={1920}
            height={384}
            className="w-full max-h-40 md:max-h-96 object-cover block"
            src={getStrapiImageUrl(retourExperience.attributes.image_principale, STRAPI_IMAGE_KEY_SIZE.large)}
            alt={retourExperience.attributes.titre || "image titre"}
          />
        </div>
        <div className="flex flex-col md:flex-row fr-container">
          <RetourExperienceExtraInfoPanel retourExperience={retourExperience} />
          <div className="flex-1 md:pl-12">
            <h1 className={"text-3xl md:text-[40px] md:leading-[3rem] mt-4"}>{retourExperience.attributes.titre}</h1>
            <CmsRichText label={retourExperience.attributes.description} className={"text-xl leading-8 mt-10"} />
            {retourExperience.attributes.citations &&
              retourExperience.attributes.citations.length > 0 &&
              retourExperience.attributes.citations.map((citation) => (
                <CustomDSFRQuote key={citation.auteur} citation={citation} className="mt-12" />
              ))}
            <div className="flex flex-col md:flex-row mt-10">
              <SituationRetourExperienceCard
                titre="Avant le projet"
                situation={retourExperience.attributes.situation_avant}
                className="mb-4 md:mb-0 md:mr-3 flex-1 bg-dsfr-background-alt-grey"
              />
              <SituationRetourExperienceCard
                titre="Après le projet"
                situation={retourExperience.attributes.situation_apres}
                className="md:ml-3 flex-1 bg-dsfr-background-alt-blue-france"
              />
            </div>
            {solutions && solutions.length > 0 && (
              <>
                <h2 className="text-3xl mt-10 mb-6">Solutions réalisées</h2>
                {solutions.map((solution) => (
                  <SolutionRetourExperienceCard solution={solution} key={solution.id} className="mb-4" />
                ))}
              </>
            )}
            {retourExperience.attributes.calendrier && retourExperience.attributes.calendrier.length > 0 && (
              <div className="fr-accordions-group">
                <h2 className="text-3xl mt-10 mb-6">Calendrier</h2>
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
                <h2 className="text-3xl mt-10 mb-4">Pour en savoir plus</h2>
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
                <h2 className="text-3xl mt-10 mb-3">Découvrir d{"'"}autres projets réalisés</h2>
                <ul className="flex grow list-none flex-wrap p-0 gap-6">
                  {retourExperience.attributes.retour_experiences?.data.map((rex) => (
                    <li key={rex.id}>
                      <RetourExperienceCard retourExperience={rex} />
                    </li>
                  ))}
                </ul>
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
