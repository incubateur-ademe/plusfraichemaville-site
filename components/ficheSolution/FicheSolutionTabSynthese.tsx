import Image from "next/image";
import { getTypeSolutionFromCode } from "@/helpers/typeSolution";
import { useMemo } from "react";
import CmsRichText from "@/components/common/CmsRichText";
import FicheSolutionInfoComparatif from "@/components/ficheSolution/FicheSolutionInfoComparatif";
import RetourExperienceCard from "@/components/retourExperience/RetourExperienceCard";
import FicheSolutionCardWithUserInfo from "@/components/ficheSolution/FicheSolutionCardWithUserInfo";
import { APIResponseData } from "@/lib/strapi/types/types";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/lib/strapi/strapiClient";
import { getCreditsImageForFicheSolution } from "@/helpers/credits-image";
import { FicheSolution } from "@/components/ficheSolution/type";

export default function FicheSolutionTabSynthese({
  ficheSolution,
}: {
  ficheSolutionId: number;
  projectName: string;
  ficheSolution: FicheSolution;
  projetId?: string;
}) {
  const typeSolution = getTypeSolutionFromCode(ficheSolution.type_solution);
  const creditsImage = useMemo(() => getCreditsImageForFicheSolution(ficheSolution), [ficheSolution]);

  const uniqueRetourExperienceList =
    ficheSolution?.solution_retour_experiences?.data.reduce((accumulator, rex) => {
      if (
        !accumulator.find(
          (item) => item.attributes.retour_experience?.data.id === rex.attributes.retour_experience?.data.id,
        )
      ) {
        accumulator.push(rex);
      }
      return accumulator;
    }, [] as APIResponseData<"api::solution-retour-experience.solution-retour-experience">[]) || [];

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="md:pr-9">
          <div className="flex flex-row justify-between items-center mb-4 relative">
            {typeSolution && (
              <div className="flex flex-row text-dsfr-text-mention-grey">
                {typeSolution.coloredIcon("fr-icon mr-4 mb-auto")}
                <span className="mt-[1px]">{typeSolution.label}</span>
              </div>
            )}
          </div>
          <div className="text-dsfr-text-title-grey font-bold text-[1.375rem] mb-4">
            {ficheSolution.description_courte}
          </div>
          <CmsRichText label={ficheSolution.description} className="text-dsfr-text-title-grey" />
        </div>
        <div className="w-full md:w-72 flex-none md:border-l border-dsfr-border-default-grey md:pl-6 ">
          <FicheSolutionInfoComparatif temperatureFormat="large" ficheSolution={ficheSolution} className={"text-sm"} />
          <hr className="pb-2 mt-1" />
          {ficheSolution.cobenefices?.data.map((cobenefice) => (
            <div key={cobenefice.id} className="flex flex-row mt-3">
              <Image
                width={50}
                height={50}
                src={`/images/cobenefices/${cobenefice.attributes.icone || "cobenefice-blank"}.svg`}
                className="mr-4 flex-none"
                alt={cobenefice.attributes.description}
              />
              <div className="text-dsfr-text-mention-grey flex items-center">{cobenefice.attributes.description}</div>
            </div>
          ))}
        </div>
      </div>
      <hr className="pb-6 mt-6 md:pb-8 md:mt-12" />
      <div className="flex flex-col md:flex-row gap-8">
        {ficheSolution.contexte_description && (
          <div className="basis-1/2">
            <div className="text-dsfr-text-title-grey font-bold text-[1.375rem] mb-4">
              {ficheSolution.contexte_titre}
            </div>
            <CmsRichText label={ficheSolution.contexte_description} className="text-dsfr-text-title-grey" />
          </div>
        )}
        <hr className="pb-1 mt-1 md:hidden" />
        {ficheSolution.rafraichissement_attendu_description && (
          <div className="basis-1/2">
            <div className="text-dsfr-text-title-grey font-bold text-[1.375rem] mb-4">Rafraîchissement attendu</div>
            <CmsRichText
              label={ficheSolution.rafraichissement_attendu_description}
              className="text-dsfr-text-title-grey"
            />
          </div>
        )}
      </div>
      {!!ficheSolution.en_savoir_plus && (
        <>
          <hr className="pb-6 mt-6 md:pb-8 " />
          <div className="text-dsfr-text-title-grey font-bold text-[1.375rem] mb-4">En savoir plus</div>
          <CmsRichText label={ficheSolution.en_savoir_plus} className="text-dsfr-text-title-grey" />
        </>
      )}
      {uniqueRetourExperienceList.length > 0 && (
        <div className="bg-dsfr-background-alt-grey rounded-2xl pl-6 pt-10 mt-12">
          <div className="text-dsfr-text-title-grey font-bold text-[1.375rem] mb-4">Découvrir les projets réalisés</div>
          <div className="text-dsfr-text-title-grey">
            Consultez les retours d’expériences de collectivités qui ont mis en place cette solution.
          </div>
          <div className="flex flex-row gap-6 pl-2 overflow-x-auto">
            {uniqueRetourExperienceList.map((rex) => (
              <RetourExperienceCard
                key={rex.attributes.retour_experience?.data.id}
                retourExperience={
                  rex.attributes.retour_experience?.data as APIResponseData<"api::retour-experience.retour-experience">
                }
                className={"w-72 flex-none mt-8 mb-12"}
              />
            ))}
          </div>
        </div>
      )}
      {!!ficheSolution.fiches_solutions_complementaires?.data.length &&
        ficheSolution.fiches_solutions_complementaires.data.length > 0 && (
          <div className="bg-dsfr-background-alt-blue-france rounded-2xl pl-6 pt-10 mt-12">
            <div className="text-dsfr-text-title-grey font-bold text-[1.375rem] mb-4">Solutions complémentaires</div>
            <div className="text-dsfr-text-title-grey">
              Les solutions complémentaires sont des solutions pour améliorer l’efficacité globale de rafraîchissement
            </div>
            <div className="flex flex-row gap-6 pl-2 overflow-x-auto">
              {ficheSolution.fiches_solutions_complementaires.data.map((fs) => (
                <FicheSolutionCardWithUserInfo
                  ficheSolution={fs}
                  key={fs.id}
                  className={"flex-none mt-8 mb-12"}
                  projectName=""
                />
              ))}
            </div>
          </div>
        )}
      {ficheSolution.logo_partenaire && !!ficheSolution.logo_partenaire.data && (
        <>
          <hr className="pb-8 mt-12" />
          <div className={"flex flex-col md:flex-row ml-4"}>
            <div className="text-lg mr-5 text-dsfr-text-mention-grey flex items-center mb-2">Partenaire</div>
            <Image
              width={110}
              height={110}
              src={getStrapiImageUrl(ficheSolution.logo_partenaire, STRAPI_IMAGE_KEY_SIZE.small)}
              alt={ficheSolution.titre}
              className={"h-full "}
            />
          </div>
        </>
      )}
      {creditsImage.length > 0 && (
        <>
          <hr className="pb-8 mt-12" />
          <div className="text-dsfr-text-title-grey font-bold mb-4">Crédits images</div>
          <div>{creditsImage.join(", ")}</div>
        </>
      )}
    </div>
  );
}
