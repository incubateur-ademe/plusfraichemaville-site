import Image from "next/image";
import { notFound } from "next/navigation";
import { getTypeSolutionFromCode } from "@/helpers/typeSolution";
import CustomTabButton from "@/components/common/CustomTabButton";
import FicheSolutionTabSynthese from "@/components/ficheSolution/FicheSolutionTabSynthese";
import FicheSolutionTabMateriaux from "@/components/ficheSolution/FicheSolutionTabMateriaux";
import FicheSolutionTabMiseEnOeuvre from "@/components/ficheSolution/FicheSolutionTabMiseEnOeuvre";
import AideDecisionBreadcrumbs from "@/components/aideDecision/AideDecisionBreadcrumbs";
import FicheSolutionTabFinancements from "@/components/ficheSolution/FicheSolutionTabFinancements";
import FicheSolutionTabOups from "@/components/ficheSolution/FicheSolutionTabOups";
import { getFicheSolutionBySlug } from "@/lib/strapi/queries/fichesSolutionsQueries";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/lib/strapi/strapiClient";
import { getAideDecisionHistoryBySlug } from "@/lib/strapi/queries/aideDecisionQueries";
import clsx from "clsx";
import ButtonShareCurrentUrl from "@/components/common/button-share-current-url";
import { GenericSaveFiche } from "../common/generic-save-fiche";

export async function FicheSolution({
  params,
  searchParams,
}: {
  params: { ficheSolutionSlug: string; projetId: string };
  searchParams: { etapeAideDecision: string | undefined };
}) {
  const ficheSolution = await getFicheSolutionBySlug(params.ficheSolutionSlug);
  const historique = await getAideDecisionHistoryBySlug(searchParams?.etapeAideDecision, true);
  if (ficheSolution) {
    const typeSolution = getTypeSolutionFromCode(ficheSolution.attributes.type_solution);
    return (
      <>
        <div className={`relative h-48 md:h-96 ${typeSolution?.bannerClass}`}>
          <Image
            width={1200}
            height={500}
            className={"w-full h-48 md:h-96 object-cover relative -z-10 "}
            src={getStrapiImageUrl(ficheSolution.attributes.image_principale, STRAPI_IMAGE_KEY_SIZE.large)}
            alt={ficheSolution.attributes.titre}
          />
          <div className="fr-container">
            <h1
              className={clsx(
                "mt-8 md:fr-container absolute text-white text-[1.375rem] md:text-[2.625rem]",
                "md:ml-56 bottom-0 md:bottom-4 font-bold leading-normal",
              )}
            >
              {ficheSolution.attributes.titre}
            </h1>
          </div>
        </div>
        <div className="h-14 w-full bg-dsfr-background-alt-blue-france absolute" />
        <div className="fr-container flex flex-row relative">
          <div className="flex-none md:w-56 md:mt-[6.5rem] md:relative">
            {historique && (
              <AideDecisionBreadcrumbs
                historique={historique}
                className="hidden md:block mb-16 -mt-2"
                currentPageLabel={ficheSolution.attributes.titre}
              />
            )}
            <ButtonShareCurrentUrl className={"hidden md:block [&>*]:mb-1"} />
            <div
              className={clsx(
                "absolute left-0 top-[68px] w-52 md:top-12 md:right-[unset]",
                "md:[&>*]:top-0 [&>*]:md:left-0 [&>*]:left-4",
              )}
            >
              <GenericSaveFiche
                id={ficheSolution.id}
                type="solution"
                projectName={(historique && historique[1].label) || ""}
                withLabel
              />
            </div>
          </div>
          <div className="fr-tabs before:!shadow-none">
            <ul className="fr-tabs__list !m-0 !p-0 !h-14" role="tablist" aria-label="Menu fiche solution">
              <li role="presentation">
                <CustomTabButton label="Synthèse" isSelected={true} contentId="synthese-panel" />
              </li>
              <li role="presentation">
                <CustomTabButton label="Matériaux et coûts" isSelected={false} contentId="materiaux-panel" />
              </li>
              <li role="presentation">
                <CustomTabButton label="Mise en œuvre" isSelected={false} contentId="mise-en-oeuvre-panel" />
              </li>
              <li role="presentation">
                <CustomTabButton label="Financements" isSelected={false} contentId="financements-panel" />
              </li>
              <li role="presentation">
                <CustomTabButton label="Oups !" isSelected={false} contentId="oups-panel" />
              </li>
            </ul>
            <div
              id="synthese-panel"
              className="fr-tabs__panel fr-tabs__panel--selected !px-0 !py-20 md:!py-12"
              role="tabpanel"
            >
              <FicheSolutionTabSynthese
                ficheSolutionId={ficheSolution.id}
                projectName={(historique && historique[1].label) || ""}
                ficheSolution={ficheSolution.attributes}
                projetId={params.projetId}
              />
            </div>
            <div id="materiaux-panel" className="fr-tabs__panel !px-0 !py-20 md:!py-12" role="tabpanel">
              <FicheSolutionTabMateriaux ficheSolution={ficheSolution.attributes} />
            </div>
            <div id="mise-en-oeuvre-panel" className="fr-tabs__panel !px-0 !py-20 md:!py-12" role="tabpanel">
              <FicheSolutionTabMiseEnOeuvre ficheSolution={ficheSolution.attributes} />
            </div>
            <div id="financements-panel" className="fr-tabs__panel !px-0 !py-20 md:!py-12" role="tabpanel">
              <FicheSolutionTabFinancements ficheSolution={ficheSolution.attributes} />
            </div>
            <div id="oups-panel" className="fr-tabs__panel !px-0 !py-20 md:!py-12" role="tabpanel">
              <FicheSolutionTabOups ficheSolution={ficheSolution.attributes} />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    notFound();
  }
}
