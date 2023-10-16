import Link from "next/link";
import { getAllTypeEspace } from "@/lib/directus/queries/aideDecisionQueries";

export default async function Posts() {
  const allTypeEspace = await getAllTypeEspace();
  return (
    <>
      <h1>Sur quel espace voulez-vous agir ?</h1>
      {allTypeEspace.map((typeEspace) => (
        <div key={typeEspace.id}>
          <Link href={`/aide-decision/${typeEspace.slug}`}>{typeEspace.nom}</Link>
        </div>
      ))}
    </>
  );
}
