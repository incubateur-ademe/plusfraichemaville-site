import { getAllFichesSolutionsWithCobenefices } from "@/src/lib/strapi/queries/fichesSolutionsQueries";
import FicheSolutionCard from "@/src/components/ficheSolution/fiche-solution-card";
import { Icone } from "@/src/lib/strapi/types/api/cobenefice";
import { TypeSolution } from "@/src/lib/strapi/types/api/fiche-solution";

const TYPE_SOLUTION_ORDER: TypeSolution[] = [
  TypeSolution.Verte,
  TypeSolution.Bleue,
  TypeSolution.Douce,
  TypeSolution.Grise,
];

export async function FichesSolutionsSante() {
  const fichesSolutions = await getAllFichesSolutionsWithCobenefices();
  const filteredFichesSolution = fichesSolutions
    .filter((fs) => fs.attributes.cobenefices?.data.find((cb) => cb.attributes.icone === Icone.AmeliorerBienEtreSante))
    .sort((a, b) => {
      const indexA = TYPE_SOLUTION_ORDER.indexOf(a.attributes.type_solution as TypeSolution);
      const indexB = TYPE_SOLUTION_ORDER.indexOf(b.attributes.type_solution as TypeSolution);
      return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
    });

  return (
    <ul className="m-0 mt-6 flex gap-6 overflow-x-auto pb-4 pl-0">
      {filteredFichesSolution.map((ficheSolution) => (
        <li key={ficheSolution.id} className="flex shrink-0 list-none">
          <FicheSolutionCard ficheSolution={ficheSolution} titleHeadingLevel="h3" />
        </li>
      ))}
    </ul>
  );
}
