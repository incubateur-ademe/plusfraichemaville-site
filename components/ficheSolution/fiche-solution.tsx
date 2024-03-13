import Image from "next/image";
import { notFound } from "next/navigation";
import { getTypeSolutionFromCode } from "@/helpers/typeSolution";
import CustomTabButton from "@/components/common/CustomTabButton";
import FicheSolutionTabSynthese from "@/components/ficheSolution/FicheSolutionTabSynthese";
import FicheSolutionTabMateriaux from "@/components/ficheSolution/FicheSolutionTabMateriaux";
import FicheSolutionTabMiseEnOeuvre from "@/components/ficheSolution/FicheSolutionTabMiseEnOeuvre";
import ButtonSaveFicheSolution from "@/components/ficheSolution/ButtonSaveFicheSolution";
import ButtonShareFicheSolution from "@/components/ficheSolution/ButtonShareFicheSolution";
import AideDecisionBreadcrumbs from "@/components/aideDecision/AideDecisionBreadcrumbs";
import FicheSolutionTabFinancements from "@/components/ficheSolution/FicheSolutionTabFinancements";
import FicheSolutionTabOups from "@/components/ficheSolution/FicheSolutionTabOups";
import { getFicheSolutionBySlug } from "@/lib/strapi/queries/fichesSolutionsQueries";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/lib/strapi/strapiClient";
import { getAideDecisionHistoryBySlug } from "@/lib/strapi/queries/aideDecisionQueries";
import { ButtonSaveFicheSolutionInProjet } from "./button-save-fiche-solution-in-projet";
import clsx from "clsx";

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
        <div className="fr-container flex flex-row">
          <div className="flex-none md:w-56 md:mt-[6.5rem]">
            {historique && (
              <AideDecisionBreadcrumbs
                historique={historique}
                className="hidden md:block mb-16 -mt-2"
                currentPageLabel={ficheSolution.attributes.titre}
              />
            )}
            <ButtonShareFicheSolution className={"hidden md:block mb-4"} />
            {params.projetId ? (
              // TODO: créer un button-save-selector => select entre bouton dans fiche projet / fiche globale
              <div className="relative [&>button]:right-auto">
                <ButtonSaveFicheSolutionInProjet ficheSolutionId={ficheSolution.id} label />
              </div>
            ) : (
              <ButtonSaveFicheSolution
                ficheSolutionId={ficheSolution.id}
                label={true}
                projectName={(historique && historique[1].label) || ""}
                className={"hidden md:block"}
              />
            )}
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
              className="fr-tabs__panel fr-tabs__panel--selected customPanel !pt-0"
              role="tabpanel"
            >
              <FicheSolutionTabSynthese
                ficheSolutionId={ficheSolution.id}
                projectName={(historique && historique[1].label) || ""}
                ficheSolution={ficheSolution.attributes}
              />
            </div>
            <div id="materiaux-panel" className="fr-tabs__panel customPanel" role="tabpanel">
              <FicheSolutionTabMateriaux ficheSolution={ficheSolution.attributes} />
            </div>
            <div id="mise-en-oeuvre-panel" className="fr-tabs__panel customPanel" role="tabpanel">
              <FicheSolutionTabMiseEnOeuvre ficheSolution={ficheSolution.attributes} />
            </div>
            <div id="financements-panel" className="fr-tabs__panel customPanel" role="tabpanel">
              <FicheSolutionTabFinancements ficheSolution={ficheSolution.attributes} />
            </div>
            <div id="oups-panel" className="fr-tabs__panel customPanel" role="tabpanel">
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
