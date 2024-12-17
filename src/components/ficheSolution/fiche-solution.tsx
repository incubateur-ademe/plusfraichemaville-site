import Image from "next/image";
import { notFound } from "next/navigation";
import { getTypeSolutionFromCode } from "@/src/helpers/type-fiche-solution";
import CustomTabButton from "@/src/components/common/CustomTabButton";
import FicheSolutionTabSynthese from "@/src/components/ficheSolution/FicheSolutionTabSynthese";
import FicheSolutionTabMateriaux from "@/src/components/ficheSolution/FicheSolutionTabMateriaux";
import FicheSolutionTabMiseEnOeuvre from "@/src/components/ficheSolution/FicheSolutionTabMiseEnOeuvre";
import AideDecisionBreadcrumbs from "@/src/components/aideDecision/AideDecisionBreadcrumbs";
import FicheSolutionTabFinancements from "@/src/components/ficheSolution/FicheSolutionTabFinancements";
import FicheSolutionTabOups from "@/src/components/ficheSolution/FicheSolutionTabOups";
import { getFicheSolutionBySlug } from "@/src/lib/strapi/queries/fichesSolutionsQueries";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { getAideDecisionHistoryBySlug } from "@/src/lib/strapi/queries/aideDecisionQueries";
import clsx from "clsx";
import ButtonShareCurrentUrl from "@/src/components/common/button-share-current-url";
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
            className={"relative -z-10 h-48 w-full object-cover md:h-96 "}
            src={getStrapiImageUrl(ficheSolution.attributes.image_principale, STRAPI_IMAGE_KEY_SIZE.large)}
            alt={ficheSolution.attributes.titre}
          />
          <div className="fr-container">
            <h1
              className={clsx(
                "md:fr-container absolute mt-8 text-[1.375rem] text-white md:text-[2.625rem]",
                "bottom-0 font-bold leading-normal md:bottom-4 md:ml-56",
              )}
            >
              {ficheSolution.attributes.titre}
            </h1>
          </div>
        </div>
        <div className="absolute h-14 w-full bg-dsfr-background-alt-blue-france" />
        <div className="fr-container relative flex flex-row">
          <div className="flex-none md:relative md:mt-[6.5rem] md:w-56">
            {historique && (
              <AideDecisionBreadcrumbs
                historique={historique}
                className="-mt-2 mb-16 hidden md:block"
                currentPageLabel={ficheSolution.attributes.titre}
              />
            )}
            <ButtonShareCurrentUrl className={"hidden md:block [&>*]:mb-1"} />
            <div className="absolute right-4 top-[68px] md:hidden">
              <GenericSaveFiche
                id={ficheSolution.id}
                type="solution"
                projectName={(historique && historique[1].label) || ""}
              />
            </div>
            <div className="mt-4 hidden md:block">
              <GenericSaveFiche
                id={ficheSolution.id}
                type="solution"
                projectName={(historique && historique[1].label) || ""}
                withLabel
              />
            </div>
          </div>
          <div className="fr-tabs before:!shadow-none">
            <ul className="fr-tabs__list !m-0 !h-14 !p-0" role="tablist" aria-label="Menu fiche solution">
              <li role="presentation">
                <CustomTabButton label="Synthèse" isSelected={true} contentId="synthese-panel" className="customTab" />
              </li>
              <li role="presentation">
                <CustomTabButton
                  label="Matériaux et coûts"
                  isSelected={false}
                  contentId="materiaux-panel"
                  className="customTab"
                />
              </li>
              <li role="presentation">
                <CustomTabButton
                  label="Mise en œuvre"
                  isSelected={false}
                  contentId="mise-en-oeuvre-panel"
                  className="customTab"
                />
              </li>
              <li role="presentation">
                <CustomTabButton
                  label="Financements"
                  isSelected={false}
                  contentId="financements-panel"
                  className="customTab"
                />
              </li>
              <li role="presentation">
                <CustomTabButton label="Oups !" isSelected={false} contentId="oups-panel" className="customTab" />
              </li>
            </ul>
            <div
              id="synthese-panel"
              className="fr-tabs__panel fr-tabs__panel--selected !px-0 md:!py-12"
              role="tabpanel"
            >
              <FicheSolutionTabSynthese
                ficheSolutionId={ficheSolution.id}
                projectName={(historique && historique[1].label) || ""}
                ficheSolution={ficheSolution}
                projetId={params.projetId}
              />
            </div>
            <div id="materiaux-panel" className="fr-tabs__panel !px-0 !pt-14 md:!py-12" role="tabpanel">
              <FicheSolutionTabMateriaux ficheAttributes={ficheSolution.attributes} />
            </div>
            <div id="mise-en-oeuvre-panel" className="fr-tabs__panel !px-0 !pt-14 md:!py-12" role="tabpanel">
              <FicheSolutionTabMiseEnOeuvre ficheAttributes={ficheSolution.attributes} />
            </div>
            <div id="financements-panel" className="fr-tabs__panel !px-0 !pt-14 md:!py-12" role="tabpanel">
              <FicheSolutionTabFinancements ficheAttributes={ficheSolution.attributes} />
            </div>
            <div id="oups-panel" className="fr-tabs__panel !px-0 !pt-14 md:!py-12" role="tabpanel">
              <FicheSolutionTabOups ficheAttributes={ficheSolution.attributes} />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    notFound();
  }
}
