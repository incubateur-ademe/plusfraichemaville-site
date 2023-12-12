import Image from "next/image";
import { getDirectusImageUrl } from "@/lib/directus/directusClient";
import { notFound } from "next/navigation";
import { getFicheSolutionBySlug } from "@/lib/directus/queries/fichesSolutionsQueries";
import { getTypeSolutionFromCode } from "@/helpers/typeSolution";
import CustomTabButton from "@/components/common/CustomTabButton";
import FicheSolutionTabSynthese from "@/components/ficheSolution/FicheSolutionTabSynthese";

export default async function FicheSolution({ params }: { params: { ficheSolutionSlug: string } }) {
  const ficheSolution = await getFicheSolutionBySlug(params.ficheSolutionSlug);
  if (ficheSolution) {
    const typeSolution = getTypeSolutionFromCode(ficheSolution.type_solution);
    return (
      <>
        <div className={"relative h-96 greenSolutionBanner"}>
          <Image
            width={1200}
            height={500}
            className={`w-full h-96 object-cover relative -z-10 ${typeSolution?.bannerClass}`}
            src={getDirectusImageUrl(ficheSolution.image_principale)}
            alt={ficheSolution?.titre || "image titre"}
          />
          <div className="fr-container">
            <h1 className={"mt-8 absolute text-[2.625rem] text-white md:left-[25%] bottom-4 font-bold leading-normal"}>
              {ficheSolution.titre}
            </h1>
          </div>
        </div>
        <div className="h-14 w-full bg-dsfr-background-alt-blue-france absolute" />
        <div className="fr-container">
          <div className="fr-tabs before:!shadow-none !shadow-none md:ml-[10rem]">
            <ul className="fr-tabs__list m-0 p-0 h-14" role="tablist" aria-label="Menu fiche solution">
              <li role="presentation">
                <CustomTabButton label="Synthèse" isSelected={true} contentId="synthese-panel" />
              </li>
              <li role="presentation">
                <CustomTabButton label="Matériaux et coûts" isSelected={false} contentId="tabpanel-405-panel" />
              </li>
              <li role="presentation">
                <CustomTabButton label="Mise en œuvre" isSelected={false} contentId="tabpanel-406-panel" />
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
          </div>
        </div>
        <div className="cmsRichText" dangerouslySetInnerHTML={{ __html: ficheSolution.description_courte || "" }}></div>
        <div className="cmsRichText" dangerouslySetInnerHTML={{ __html: ficheSolution.description_courte || "" }}></div>
      </>
    );
  } else {
    notFound();
  }
}
