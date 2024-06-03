import Image from "next/image";
import { getTypeSolutionFromCode } from "@/helpers/typeSolution";
import { useMemo } from "react";
import CmsRichText from "@/components/common/CmsRichText";
import FicheSolutionInfoComparatif from "@/components/ficheSolution/FicheSolutionInfoComparatif";
import RetourExperienceCard from "@/components/retourExperience/RetourExperienceCard";
import FicheSolutionCardWithUserInfo from "@/components/ficheSolution/FicheSolutionCardWithUserInfo";
import { APIResponseData } from "@/lib/strapi/types/types";
import { FicheSolution } from "@/components/ficheSolution/type";
import { getCreditsImageForFicheSolution } from "@/helpers/credits-image";

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
      <div className="flex flex-col justify-between md:flex-row">
        <div className="md:pr-9">
          <div className="relative mb-4 flex flex-row items-center justify-between">
            {typeSolution && (
              <div className="flex flex-row text-dsfr-text-mention-grey">
                {typeSolution.coloredIcon("fr-icon mr-4 mb-auto")}
                <span className="mt-[1px]">{typeSolution.label}</span>
              </div>
            )}
          </div>
          <div className="mb-4 text-[1.375rem] font-bold text-dsfr-text-title-grey">
            {ficheSolution.description_courte}
          </div>
          <CmsRichText label={ficheSolution.description} className="text-dsfr-text-title-grey" />
        </div>
        <div className="w-full flex-none border-dsfr-border-default-grey md:w-72 md:border-l md:pl-6 ">
          <FicheSolutionInfoComparatif temperatureFormat="large" ficheSolution={ficheSolution} className={"text-sm"} />
          <hr className="mt-1 pb-2" />
          {ficheSolution.cobenefices?.data.map((cobenefice) => (
            <div key={cobenefice.id} className="mt-3 flex flex-row">
              <Image
                width={50}
                height={50}
                src={`/images/cobenefices/${cobenefice.attributes.icone || "cobenefice-blank"}.svg`}
                className="mr-4 flex-none"
                alt={cobenefice.attributes.description}
              />
              <div className="flex items-center text-dsfr-text-mention-grey">{cobenefice.attributes.description}</div>
            </div>
          ))}
        </div>
      </div>
      <hr className="mt-6 pb-6 md:mt-12 md:pb-8" />
      <div className="flex flex-col gap-8 md:flex-row">
        {ficheSolution.contexte_description && (
          <div className="basis-1/2">
            <div className="mb-4 text-[1.375rem] font-bold text-dsfr-text-title-grey">
              {ficheSolution.contexte_titre}
            </div>
            <CmsRichText label={ficheSolution.contexte_description} className="text-dsfr-text-title-grey" />
          </div>
        )}
        <hr className="mt-1 pb-1 md:hidden" />
        {ficheSolution.rafraichissement_attendu_description && (
          <div className="basis-1/2">
            <div className="mb-4 text-[1.375rem] font-bold text-dsfr-text-title-grey">Rafraîchissement attendu</div>
            <CmsRichText
              label={ficheSolution.rafraichissement_attendu_description}
              className="text-dsfr-text-title-grey"
            />
          </div>
        )}
      </div>
      {!!ficheSolution.en_savoir_plus && (
        <>
          <hr className="mt-6 pb-6 md:pb-8 " />
          <div className="mb-4 text-[1.375rem] font-bold text-dsfr-text-title-grey">En savoir plus</div>
          <CmsRichText label={ficheSolution.en_savoir_plus} className="text-dsfr-text-title-grey" />
        </>
      )}
      {uniqueRetourExperienceList.length > 0 && (
        <div className="mt-12 rounded-2xl bg-dsfr-background-alt-grey pl-6 pt-10">
          <div className="mb-4 text-[1.375rem] font-bold text-dsfr-text-title-grey">Découvrir les projets réalisés</div>
          <div className="text-dsfr-text-title-grey">
            Consultez les retours d’expériences de collectivités qui ont mis en place cette solution.
          </div>
          <div className="flex flex-row gap-6 overflow-x-auto pl-2">
            {uniqueRetourExperienceList.map((rex) => (
              <RetourExperienceCard
                key={rex.attributes.retour_experience?.data.id}
                retourExperience={
                  rex.attributes.retour_experience?.data as APIResponseData<"api::retour-experience.retour-experience">
                }
                className={"mb-12 mt-8 w-72 flex-none"}
              />
            ))}
          </div>
        </div>
      )}
      {!!ficheSolution.fiches_solutions_complementaires?.data.length &&
        ficheSolution.fiches_solutions_complementaires.data.length > 0 && (
          <div className="mt-12 rounded-2xl bg-dsfr-background-alt-blue-france pl-6 pt-10">
            <div className="mb-4 text-[1.375rem] font-bold text-dsfr-text-title-grey">Solutions complémentaires</div>
            <div className="text-dsfr-text-title-grey">
              Les solutions complémentaires sont des solutions pour améliorer l’efficacité globale de rafraîchissement
            </div>
            <div className="flex flex-row gap-6 overflow-x-auto pl-2">
              {ficheSolution.fiches_solutions_complementaires.data.map((fs) => (
                <FicheSolutionCardWithUserInfo
                  ficheSolution={fs}
                  key={fs.id}
                  className={"mb-12 mt-8 flex-none"}
                  projectName=""
                />
              ))}
            </div>
          </div>
        )}
      {!!ficheSolution.credits && (
        <>
          <hr className="mt-12 pb-8" />
          <div className="mb-4 text-[1.375rem] font-bold text-dsfr-text-title-grey">Crédits</div>
          <CmsRichText label={ficheSolution.credits} className="text-dsfr-text-title-grey" />
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
  );
}
