import TypeSolutionFilter from "@/src/components/filters/TypeSolutionFilter";
import BaisseTemperatureFilter from "@/src/components/filters/BaisseTemperatureFilter";
import { getBaisseTemperatureFicheSolutionFromTemperature } from "@/src/helpers/baisseTemperatureFicheSolution";

import FicheSolutionCard from "./fiche-solution-card";
import TypeEspaceFilter from "../filters/type-espace-filter-component";
import { getFullUrl, PFMV_ROUTES } from "@/src/helpers/routes";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";

type FichesSolutionsProps = {
  searchParams: {
    espaceFilter: string | undefined;
    typeSolutionFilter: string | undefined;
    baisseTemperatureFilter: string | undefined;
  };
  allFichesSolutions: FicheSolution[];
};

export function FichesSolutions({ searchParams, allFichesSolutions }: FichesSolutionsProps) {
  const filteredFichesSolutions = allFichesSolutions
    .filter((fs) => !searchParams.espaceFilter || fs.attributes.types_espace?.includes(searchParams.espaceFilter))
    .filter(
      (fs) =>
        !searchParams.typeSolutionFilter ||
        (fs.attributes.type_solution &&
          searchParams.typeSolutionFilter?.split(",").includes(fs.attributes.type_solution)),
    )
    .filter(
      (fs) =>
        !searchParams.baisseTemperatureFilter ||
        searchParams.baisseTemperatureFilter
          .split(",")
          .includes(getBaisseTemperatureFicheSolutionFromTemperature(fs.attributes.baisse_temperature || 0).code),
    );
  return (
    <>
      <link rel="canonical" href={getFullUrl(PFMV_ROUTES.FICHES_SOLUTIONS)} />
      <TypeEspaceFilter className="mb-8 mt-8 flex justify-center md:ml-52 md:justify-normal" />
      <div className="flex flex-col md:flex-row">
        <div className="md:min-w-[13rem]">
          <TypeSolutionFilter className="mb-6" />
          <BaisseTemperatureFilter className="mb-6" />
        </div>
        {filteredFichesSolutions.length === 0 ? (
          <div className="text-xl font-bold">Aucune fiche solution ne correspond à vos critères.</div>
        ) : (
          <div className="grow list-none p-0">
            <ul className="m-0 flex flex-wrap justify-center gap-6 p-0 md:justify-normal">
              {filteredFichesSolutions.map((ficheSolution) => (
                <li key={ficheSolution.id} className="flex">
                  <FicheSolutionCard ficheSolution={ficheSolution} titleHeadingLevel="h2" />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
