import { getAllFichesSolutionsWithCobenefices } from "@/src/lib/strapi/queries/fichesSolutionsQueries";
import FicheSolutionCard from "@/src/components/ficheSolution/fiche-solution-card";
import { Icone } from "@/src/lib/strapi/types/api/cobenefice";

export async function FichesSolutionsSante() {
  const fichesSolutions = await getAllFichesSolutionsWithCobenefices();
  const filteredFichesSolution = fichesSolutions.filter(
    (fs) => fs.attributes.cobenefices?.data.find((cb) => cb.attributes.icone === Icone.AmeliorerBienEtreSante),
  );

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
