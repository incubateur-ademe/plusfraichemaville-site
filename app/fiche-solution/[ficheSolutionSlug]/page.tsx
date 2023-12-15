import Image from "next/image";
import { getDirectusImageUrl } from "@/lib/directus/directusClient";
import { notFound } from "next/navigation";
import { getFicheSolutionBySlug } from "@/lib/directus/queries/fichesSolutionsQueries";
import { getTypeSolutionFromCode } from "@/helpers/typeSolution";
import CustomTabButton from "@/components/common/CustomTabButton";
import FicheSolutionTabSynthese from "@/components/ficheSolution/FicheSolutionTabSynthese";
import FicheSolutionTabMateriaux from "@/components/ficheSolution/FicheSolutionTabMateriaux";
import FicheSolutionTabMiseEnOeuvre from "@/components/ficheSolution/FicheSolutionTabMiseEnOeuvre";
import ButtonSaveFicheSolution from "@/components/ficheSolution/ButtonSaveFicheSolution";
import ButtonShareFicheSolution from "@/components/ficheSolution/ButtonShareFicheSolution";
import { getAideDecisionHistoryBySlug } from "@/lib/directus/queries/aideDecisionQueries";
import AideDecisionBreadcrumbs from "@/components/aideDecision/AideDecisionBreadcrumbs";

export default async function FicheSolution({
  params,
  searchParams,
}: {
  params: { ficheSolutionSlug: string };
  searchParams: { etapeAideDecision: string | undefined };
}) {
  const ficheSolution = await getFicheSolutionBySlug(params.ficheSolutionSlug);
  const historique = await getAideDecisionHistoryBySlug(searchParams?.etapeAideDecision, true);
  if (ficheSolution) {
    const typeSolution = getTypeSolutionFromCode(ficheSolution.type_solution);
    return (
      <>
        <div className={"relative h-48 md:h-96 greenSolutionBanner"}>
          <Image
            width={1200}
            height={500}
            className={`w-full h-48 md:h-96 object-cover relative -z-10 ${typeSolution?.bannerClass}`}
            src={getDirectusImageUrl(ficheSolution.image_principale)}
            alt={ficheSolution?.titre || "image titre"}
          />
          <div className="fr-container">
            <h1
              className={
                "mt-8 md:fr-container absolute text-white text-[1.375rem] md:text-[2.625rem] " +
                " md:ml-[11rem] bottom-0 md:bottom-4 font-bold leading-normal"
              }
            >
              {ficheSolution.titre}
            </h1>
          </div>
        </div>
        <div className="h-14 w-full bg-dsfr-background-alt-blue-france absolute" />
        <div className="fr-container flex flex-row">
          <div className="hidden md:block flex-none w-56 mt-[6.5rem]">
            {historique && (
              <AideDecisionBreadcrumbs
                historique={historique}
                className="mb-16 -mt-2"
                currentPageLabel={ficheSolution.titre}
              />
            )}
            <ButtonShareFicheSolution className={"mb-4"} />
            <ButtonSaveFicheSolution
              ficheSolution={ficheSolution}
              projectName={(historique && historique[1].label) || ""}
              className=""
              label={true}
            />
          </div>
          <div className="fr-tabs before:!shadow-none !shadow-none">
            <ul className="fr-tabs__list m-0 p-0 h-14" role="tablist" aria-label="Menu fiche solution">
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
                <CustomTabButton label="Financements" isSelected={false} contentId="tabpanel-407-panel" />
              </li>
              <li role="presentation">
                <CustomTabButton label="Oups" isSelected={false} contentId="tabpanel-407-panel" />
              </li>
            </ul>
            <div id="synthese-panel" className="fr-tabs__panel customPanel fr-tabs__panel--selected" role="tabpanel">
              <FicheSolutionTabSynthese ficheSolution={ficheSolution} />
            </div>
            <div id="materiaux-panel" className="fr-tabs__panel customPanel" role="tabpanel">
              <FicheSolutionTabMateriaux ficheSolution={ficheSolution} />
            </div>
            <div id="mise-en-oeuvre-panel" className="fr-tabs__panel customPanel" role="tabpanel">
              <FicheSolutionTabMiseEnOeuvre ficheSolution={ficheSolution} />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    notFound();
  }
}
