import { getCreditsImageForRetourExperience } from "@/src/helpers/credits-image";
import clsx from "clsx";
import { ImageLoader } from "../common/image-loader";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import RetourExperienceExtraInfoPanel from "../retourExperience/RetourExperienceExtraInfoPanel";
import CmsRichText from "../common/CmsRichText";
import CustomDSFRQuote from "../common/CustomDSFRQuote";
import SituationRetourExperienceCard from "../retourExperience/SituationRetourExperienceCard";
import SolutionRetourExperienceCard from "../retourExperience/SolutionRetourExperienceCard";
import CalendrierRetourExperienceAccordion from "../retourExperience/CalendrierRetourExperienceAccordion";
import ItemRetourExperience from "../retourExperience/ItemRetourExperience";
import RetourExperienceCard from "../retourExperience/RetourExperienceCard";
import { RetourExperience } from "@/src/lib/strapi/types/api/retour-experience";
import { isEmpty } from "@/src/helpers/listUtils";

type RetourExperienceContentProps = {
  retourExperience: RetourExperience;
  isModal?: boolean;
};

export const RetourExperienceContent = ({ retourExperience, isModal }: RetourExperienceContentProps) => {
  const creditsImage = getCreditsImageForRetourExperience(retourExperience);
  const solutions = retourExperience.attributes.solution_retour_experiences?.data;
  const linkedRetourExperiences = retourExperience.attributes.retour_experiences?.data;
  return (
    <>
      <div className={clsx("h-max", isModal && "-mx-8")}>
        <ImageLoader
          width={1920}
          height={384}
          className="block max-h-40 min-h-96 w-full object-cover md:max-h-96"
          src={getStrapiImageUrl(retourExperience.attributes.image_principale, STRAPI_IMAGE_KEY_SIZE.large)}
          alt={retourExperience.attributes.titre || "image titre"}
          unoptimized
        />
      </div>
      <div className="fr-container flex flex-col md:flex-row">
        <RetourExperienceExtraInfoPanel retourExperience={retourExperience} />
        <div className={clsx("flex-1 md:pl-12")}>
          <h1 className={"mt-4 text-3xl md:text-[40px] md:leading-[3rem]"}>{retourExperience.attributes.titre}</h1>
          <CmsRichText
            label={retourExperience.attributes.description}
            className={"mt-10 text-xl leading-8 [&_p]:text-xl [&_p]:leading-8"}
          />
          {!isEmpty(retourExperience.attributes.citations) &&
            retourExperience.attributes.citations.map((citation) => (
              <CustomDSFRQuote key={citation.auteur} citation={citation} className="mt-12" />
            ))}
          <div className={clsx("mt-10 flex flex-col flex-wrap gap-6 md:flex-row")}>
            <div className="flex-1">
              <SituationRetourExperienceCard
                titre="Avant le projet"
                situation={retourExperience.attributes.situation_avant}
                className={clsx("h-full !bg-dsfr-background-alt-grey", isModal && "w-96")}
              />
            </div>
            <div className="flex-1">
              <SituationRetourExperienceCard
                titre="Après le projet"
                situation={retourExperience.attributes.situation_apres}
                className={clsx("h-full !bg-dsfr-background-alt-blue-france", isModal && "w-96")}
              />
            </div>
          </div>
          {!isEmpty(solutions) && (
            <>
              <h2 className="mb-6 mt-10 text-3xl">Solutions réalisées</h2>
              {solutions.map((solution) => (
                <SolutionRetourExperienceCard
                  solution={solution}
                  key={solution.id}
                  displayFicheSolutionCard={isModal}
                  className={clsx("mb-4", isModal && "!mb-12 flex-col lg:flex-row")}
                />
              ))}
            </>
          )}
          {!isEmpty(retourExperience.attributes.calendrier) && !isModal && (
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
          {!!(linkedRetourExperiences && linkedRetourExperiences.length > 0 && !isModal) && (
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
};
