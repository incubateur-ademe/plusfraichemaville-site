import { getAllFichesSolutions } from "@/lib/directus/queries/fichesSolutionsQueries";
import FicheSolutionFullCard from "@/components/ficheSolution/FicheSolutionFullCard";
import TypeEspaceFilter from "@/components/filters/TypeEspaceFilter";
import TypeSolutionFilter from "@/components/filters/TypeSolutionFilter";

export default async function FichesSolutions({
  searchParams,
}: {
  searchParams: {
    espaceFilter: string | undefined;
    typeSolutionFilter: string | undefined;
    potentielRafraichissement: string | undefined;
  };
}) {
  const allFichesSolutions = await getAllFichesSolutions();
  const filteredFichesSolutions = allFichesSolutions
    .filter((fs) => !searchParams.espaceFilter || fs.types_espace?.includes(searchParams.espaceFilter))
    .filter(
      (fs) =>
        !searchParams.typeSolutionFilter ||
        (fs.type_solution && searchParams.typeSolutionFilter?.split(",").includes(fs.type_solution)),
    );
  return (
    <div className="fr-container">
      <TypeEspaceFilter className="justify-center mb-8 mt-8" />
      <div className="flex flex-col md:flex-row">
        <TypeSolutionFilter className="md:w-[13rem]" />
        <div className="grow list-none justify-center p-0">
          <ul className="flex flex-wrap justify-center gap-6">
            {filteredFichesSolutions.map((ficheSolution) => (
              <li key={ficheSolution.id} className="flex">
                <FicheSolutionFullCard ficheSolution={ficheSolution} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
