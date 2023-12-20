import { getAllFichesSolutions } from "@/lib/directus/queries/fichesSolutionsQueries";
import FicheSolutionFullCard from "@/components/ficheSolution/FicheSolutionFullCard";

export default async function Posts() {
  const allFichesSolutions = await getAllFichesSolutions();
  return (
    <div className="fr-container">
      <ul className="flex list-none flex-wrap justify-center gap-6">
        {allFichesSolutions.map((ficheSolution) => (
          <li key={ficheSolution.id} className="flex">
            <FicheSolutionFullCard ficheSolution={ficheSolution} />
          </li>
        ))}
      </ul>
    </div>
  );
}
