import { getFichesTechniques } from "@/lib/directus/queries/fichesTechniquesQueries";
import FicheTechniqueCard from "@/components/aideDecision/ficheTechniqueCard";

export default async function Posts() {
  const allFichesTechniques = await getFichesTechniques();
  return (
    <>
      <h1>Toutes les fiches techniques</h1>
      <ul className="flex list-none flex-wrap justify-center p-0">
        {allFichesTechniques.map((ficheTechnique) => (
          <li key={ficheTechnique.id} className="m-2 w-80 flex">
            <FicheTechniqueCard ficheTechnique={ficheTechnique} />
          </li>
        ))}
      </ul>
    </>
  );
}
