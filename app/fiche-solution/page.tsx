import { getAllFichesSolutions } from "@/lib/directus/queries/fichesSolutionsQueries";
import TypeEspaceFilter from "@/components/filters/TypeEspaceFilter";
import TypeSolutionFilter from "@/components/filters/TypeSolutionFilter";
import BaisseTemperatureFilter from "@/components/filters/BaisseTemperatureFilter";
import { getBaisseTemperatureFicheSolutionFromTemperature } from "@/helpers/baisseTemperatureFicheSolution";
import FicheSolutionCardWithUserInfo from "@/components/ficheSolution/FicheSolutionCardWithUserInfo";

export default async function FichesSolutions({
  searchParams,
}: {
  searchParams: {
    espaceFilter: string | undefined;
    typeSolutionFilter: string | undefined;
    baisseTemperatureFilter: string | undefined;
  };
}) {
  const allFichesSolutions = await getAllFichesSolutions();

  const filteredFichesSolutions = allFichesSolutions
    .filter((fs) => !searchParams.espaceFilter || fs.types_espace?.includes(searchParams.espaceFilter))
    .filter(
      (fs) =>
        !searchParams.typeSolutionFilter ||
        (fs.type_solution && searchParams.typeSolutionFilter?.split(",").includes(fs.type_solution)),
    )
    .filter(
      (fs) =>
        !searchParams.baisseTemperatureFilter ||
        searchParams.baisseTemperatureFilter
          .split(",")
          .includes(getBaisseTemperatureFicheSolutionFromTemperature(fs.baisse_temperature).code),
    );
  return (
    <div className="fr-container">
      <TypeEspaceFilter className="mb-8 mt-8 md:ml-52 flex justify-center md:justify-normal" />
      <div className="flex flex-col md:flex-row">
        <div className="md:min-w-[13rem]">
          <TypeSolutionFilter className="mb-6" />
          <BaisseTemperatureFilter className="mb-6" />
        </div>
        <div className="grow list-none p-0">
          <ul className="flex flex-wrap gap-6 justify-center md:justify-normal">
            {filteredFichesSolutions.map((ficheSolution) => (
              <li key={ficheSolution.id} className="flex">
                <FicheSolutionCardWithUserInfo projectName={""} ficheSolution={ficheSolution} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
