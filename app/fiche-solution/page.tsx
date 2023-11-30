import { getAllFichesSolutions } from "@/lib/directus/queries/fichesSolutionsQueries";
import FicheSolutionFullCard from "@/components/ficheSolution/FicheSolutionFullCard";

export default async function Posts() {
  const allFichesSolutions = await getAllFichesSolutions();
  return (
    <div className="fr-container">
      <ul className="flex list-none flex-wrap justify-center p-0">
        {allFichesSolutions.map((ficheSolution) => (
          <li key={ficheSolution.id} className="m-2 w-80 flex">
            <FicheSolutionFullCard ficheSolution={ficheSolution} />
          </li>
        ))}
      </ul>
    </div>
  );
}
