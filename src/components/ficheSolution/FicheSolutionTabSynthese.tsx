import Image from "next/image";
import { getTypeSolutionFromCode } from "@/src/helpers/type-fiche-solution";
import { useMemo } from "react";
import CmsRichText from "@/src/components/common/CmsRichText";
import FicheSolutionInfoComparatif from "@/src/components/ficheSolution/FicheSolutionInfoComparatif";
import RetourExperienceCard from "@/src/components/retourExperience/RetourExperienceCard";
import FicheSolutionCard from "@/src/components/ficheSolution/fiche-solution-card";
import { getCreditsImageForFicheSolution } from "@/src/helpers/credits-image";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { SolutionRetourExperience } from "@/src/lib/strapi/types/api/solution-retour-experience";
import { RetourExperience } from "@/src/lib/strapi/types/api/retour-experience";
import EspaceProjetIncentiveBanner from "@/src/components/common/espace-projet-incentive/espace-projet-incentive-banner";
import { GenericLink } from "@/src/components/common/generic-links/generic-link";

export default function FicheSolutionTabSynthese({
  ficheSolution,
}: {
  ficheSolutionId: number;
  ficheSolution: FicheSolution;
  projetId?: string;
}) {
  const typeSolution = getTypeSolutionFromCode(ficheSolution.attributes.type_solution);
  const creditsImage = useMemo(() => getCreditsImageForFicheSolution(ficheSolution), [ficheSolution]);
  const ficheAttributes = ficheSolution?.attributes;

  const uniqueRetourExperienceList =
    ficheSolution?.attributes.solution_retour_experiences?.data.reduce((accumulator, rex) => {
      if (
        !accumulator.find(
          (item) => item.attributes.retour_experience?.data.id === rex.attributes.retour_experience?.data.id,
        )
      ) {
        accumulator.push(rex);
      }
      return accumulator;
    }, [] as SolutionRetourExperience[]) || [];

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
            {ficheAttributes.description_courte}
          </div>
          <CmsRichText label={ficheAttributes.description} className="text-dsfr-text-title-grey" />
        </div>
        <div className="w-full flex-none border-dsfr-border-default-grey md:w-72 md:border-l md:pl-6 ">
          <FicheSolutionInfoComparatif
            temperatureFormat="large"
            ficheAttributes={ficheAttributes}
            className={"text-sm"}
          />
          <hr className="mt-1 pb-2" />
          {ficheAttributes.cobenefices?.data.map((cobenefice) => (
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
        {ficheAttributes.contexte_description && (
          <div className="basis-1/2">
            <div className="mb-4 text-[1.375rem] font-bold text-dsfr-text-title-grey">
              {ficheAttributes.contexte_titre}
            </div>
            <CmsRichText label={ficheAttributes.contexte_description} className="text-dsfr-text-title-grey" />
          </div>
        )}
        <hr className="mt-1 pb-1 md:hidden" />
        {ficheAttributes.rafraichissement_attendu_description && (
          <div className="basis-1/2">
            <div className="mb-4 text-[1.375rem] font-bold text-dsfr-text-title-grey">Rafraîchissement attendu</div>
            <CmsRichText
              label={ficheAttributes.rafraichissement_attendu_description}
              className="text-dsfr-text-title-grey"
            />
          </div>
        )}
      </div>
      <EspaceProjetIncentiveBanner
        message="Obtenez vos solutions de rafraîchissement sur-mesure."
        className="md:my-10"
        imagePath="/images/espace-projet-incentive/trouver-solutions.svg"
      />
      {!!ficheAttributes.en_savoir_plus && (
        <>
          <hr className="mt-6 pb-6 md:pb-8 " />
          <h2 className="mb-4 text-[1.375rem] font-bold text-dsfr-text-title-grey">En savoir plus</h2>
          <CmsRichText label={ficheAttributes.en_savoir_plus} className="text-dsfr-text-title-grey" />
        </>
      )}
      {uniqueRetourExperienceList.length > 0 && (
        <div className="mt-12 rounded-2xl bg-dsfr-background-alt-grey pb-10 pl-4 pt-6">
          <h2 className="mb-4 ml-2 text-[1.375rem] font-bold text-dsfr-text-title-grey">
            Découvrir les projets réalisés
          </h2>
          <div className="ml-2 text-dsfr-text-title-grey">
            Consultez les retours d’expériences de collectivités qui ont mis en place cette solution.
          </div>
          <div className="flex flex-row gap-6 overflow-x-auto pl-2">
            {uniqueRetourExperienceList.map((rex) => (
              <RetourExperienceCard
                key={rex.attributes.retour_experience?.data.id}
                retourExperience={rex.attributes.retour_experience?.data as RetourExperience}
                className={"mb-10 mt-8 w-72 flex-none"}
              />
            ))}
          </div>
          <GenericLink page="retoursExperience" className="ml-2 text-pfmv-dark-blue">
            Voir plus de projets réalisés
          </GenericLink>
        </div>
      )}
      <EspaceProjetIncentiveBanner
        message="Vous ne savez pas par où commencer ? Créez votre compte et laissez-vous guider !"
        className="md:my-10"
        imagePath="/images/espace-projet-incentive/guide.svg"
      />
      {!!ficheAttributes.fiches_solutions_complementaires?.data.length &&
        ficheAttributes.fiches_solutions_complementaires.data.length > 0 && (
          <div className="mt-12 rounded-2xl bg-dsfr-background-alt-blue-france pb-10 pl-4 pt-6">
            <h2 className="mb-4 ml-2 text-[1.375rem] font-bold text-dsfr-text-title-grey">Solutions complémentaires</h2>
            <div className="ml-2 text-dsfr-text-title-grey">
              Les solutions complémentaires sont des solutions pour améliorer l’efficacité globale de rafraîchissement
            </div>
            <div className="flex flex-row gap-6 overflow-x-auto pl-2">
              {ficheAttributes.fiches_solutions_complementaires.data.map((fs) => (
                <FicheSolutionCard ficheSolution={fs} key={fs.id} className={"mb-10 mt-8 flex-none"} />
              ))}
            </div>
            <GenericLink page="fichesSolution" className="ml-2 text-pfmv-dark-blue">
              Voir plus de solutions complémentaires
            </GenericLink>
          </div>
        )}
      {!!ficheAttributes.credits && (
        <>
          <hr className="mt-12 pb-8" />
          <h2 className="mb-4 text-[1.375rem] font-bold text-dsfr-text-title-grey">Crédits</h2>
          <CmsRichText label={ficheAttributes.credits} className="text-dsfr-text-title-grey" />
        </>
      )}
      {creditsImage.length > 0 && (
        <>
          <hr className="mt-12 pb-8" />
          <h2 className="mb-4 font-bold text-dsfr-text-title-grey">Crédits images</h2>
          <div>{creditsImage.join(", ")}</div>
        </>
      )}
    </div>
  );
}
