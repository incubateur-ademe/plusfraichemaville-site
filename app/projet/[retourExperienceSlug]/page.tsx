import Image from "next/image";
import { getDirectusImageUrl } from "@/lib/directus/directusClient";
import { getRetourExperienceBySlug } from "@/lib/directus/queries/retoursExperienceQueries";
import CustomDSFRQuote from "@/components/common/CustomDSFRQuote";
import SituationRetourExperienceCard from "@/components/retourExperience/SituationRetourExperienceCard";
import SolutionRetourExperienceCard from "@/components/retourExperience/SolutionRetourExperienceCard";
import CalendrierRetourExperienceAccordion from "@/components/retourExperience/CalendrierRetourExperienceAccordion";
import { EtapeCalendrierRetourExperience } from "@/lib/directus/directusCustomModels";
import ItemRetourExperience from "@/components/retourExperience/ItemRetourExperience";
import RetourExperienceExtraInfoPanel from "@/components/retourExperience/RetourExperienceExtraInfoPanel";
import { notFound } from "next/navigation";
import RetourExperienceCustomCard from "@/components/retourExperience/RetourExperienceCustomCard";
import CmsRichText from "@/components/common/CmsRichText";

export default async function RetourExperience({ params }: { params: { retourExperienceSlug: string } }) {
  const retourExperience = await getRetourExperienceBySlug(params.retourExperienceSlug);
  if (retourExperience) {
    return (
      <>
        <div className="h-max">
          <Image
            width={1920}
            height={384}
            className="w-full max-h-40 md:max-h-96 object-cover block"
            src={getDirectusImageUrl(retourExperience.image_principale)}
            alt={retourExperience?.titre || "image titre"}
          />
        </div>
        <div className="flex flex-col md:flex-row fr-container">
          <RetourExperienceExtraInfoPanel retourExperience={retourExperience} />
          <div className="flex-1 md:pl-12">
            <h1 className={"text-3xl md:text-[40px] md:leading-[3rem] mt-4"}>{retourExperience.titre}</h1>
            <CmsRichText label={retourExperience.description} className={"text-xl leading-8 mt-10"}/>
            {retourExperience.citation &&
              retourExperience.citation.length > 0 &&
              retourExperience.citation.map((citation) => (
                <CustomDSFRQuote key={citation.auteur} citation={citation} className="mt-12" />
              ))}
            <div className="flex flex-col md:flex-row mt-10">
              <SituationRetourExperienceCard
                titre="Avant le projet"
                situation={retourExperience.situation_avant}
                className="mb-4 md:mb-0 md:mr-3 flex-1 bg-dsfr-background-grey"
              />
              <SituationRetourExperienceCard
                titre="Après le projet"
                situation={retourExperience.situation_apres}
                className="md:ml-3 flex-1 bg-dsfr-background-blue-cumulus"
              />
            </div>
            {retourExperience.solutions?.length > 0 && (
              <>
                <h2 className="text-3xl mt-10 mb-6">Solutions réalisées</h2>
                {retourExperience.solutions.map((solution) => (
                  <SolutionRetourExperienceCard solution={solution} key={solution.id} className="mb-4" />
                ))}
              </>
            )}
            {retourExperience.calendrier && retourExperience.calendrier.length > 0 && (
              <div className="fr-accordions-group">
                <h2 className="text-3xl mt-10 mb-6">Calendrier</h2>
                <CalendrierRetourExperienceAccordion
                  etapes={retourExperience.calendrier as EtapeCalendrierRetourExperience[]}
                />
              </div>
            )}
            <ItemRetourExperience title="Budget et financements" content={retourExperience.financement} level="title" />
            <ItemRetourExperience
              title="Difficultés rencontrées"
              content={retourExperience.difficultes}
              level="title"
            />
            {(retourExperience.partenaires || retourExperience.ressources || retourExperience.credits) && (
              <>
                <h2 className="text-3xl mt-10 mb-4">Pour en savoir plus</h2>
                <ItemRetourExperience title="Partenaires" content={retourExperience.partenaires} level="subtitle" />
                <ItemRetourExperience title="Ressources" content={retourExperience.ressources} level="subtitle" />
                <ItemRetourExperience title="Crédits" content={retourExperience.credits} level="subtitle" />
              </>
            )}
            {retourExperience.retours_experience_lies?.length > 0 && (
              <>
                <h2 className="text-3xl mt-10 mb-3">Découvrir d{"'"}autres projets réalisés</h2>
                <ul className="flex grow list-none flex-wrap p-0">
                  {retourExperience.retours_experience_lies.map((rex) => (
                    <li key={rex.related_retour_experience_id.id} className="m-2 w-80 flex">
                      <RetourExperienceCustomCard retourExperience={rex.related_retour_experience_id} />
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
