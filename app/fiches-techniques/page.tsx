import Link from "next/link";
import { getFichesTechniques } from "@/lib/directus/queries/fichesTechniques";

export default async function Posts() {
  const allFichesTechniques = await getFichesTechniques();
  return (
    <>
      <h1>Toutes les fiches techniques</h1>
      {allFichesTechniques.map((ficheTechnique) => (
        <div key={ficheTechnique.id}>
          <Link href={`/fiches-techniques/${ficheTechnique.id}`}>{ficheTechnique.titre}</Link>
        </div>
      ))}
    </>
  );
}
