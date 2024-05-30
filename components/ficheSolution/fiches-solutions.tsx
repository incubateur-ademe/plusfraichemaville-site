import TypeEspaceFilter from "@/components/filters/TypeEspaceFilter";
import TypeSolutionFilter from "@/components/filters/TypeSolutionFilter";
import BaisseTemperatureFilter from "@/components/filters/BaisseTemperatureFilter";
import { getBaisseTemperatureFicheSolutionFromTemperature } from "@/helpers/baisseTemperatureFicheSolution";
import { getAllFichesSolutions } from "@/lib/strapi/queries/fichesSolutionsQueries";

import FicheSolutionCardWithUserInfo from "./FicheSolutionCardWithUserInfo";

type FichesSolutionsProps = {
  searchParams: {
    espaceFilter: string | undefined;
    typeSolutionFilter: string | undefined;
    baisseTemperatureFilter: string | undefined;
  };
};

export async function FichesSolutions({ searchParams }: FichesSolutionsProps) {
  const allFichesSolutions = await getAllFichesSolutions();

  const filteredFichesSolutions = allFichesSolutions
    // @ts-ignore
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
    <div className="fr-container">
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
                  <FicheSolutionCardWithUserInfo projectName={""} ficheSolution={ficheSolution} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
