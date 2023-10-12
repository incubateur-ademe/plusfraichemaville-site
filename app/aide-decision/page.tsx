import Link from "next/link";
import { getAllTypeEspace } from "@/lib/directus/queries/aideDecision";

export default async function Posts() {
  const allTypeEspace = await getAllTypeEspace();
  return (
    <>
      <h1>Sur quel espace voulez-vous agir ?</h1>
      {allTypeEspace.map((typeEspace) => (
        <div key={typeEspace.id}>
          <Link href={`/type-espace/${typeEspace.slug}`}>{typeEspace.nom}</Link>
        </div>
      ))}
    </>
  );
}
