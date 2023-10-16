import Link from "next/link";
import { getAideDecisionEtapeByTypeEspaceSlug } from "@/lib/directus/queries/aideDecisionQueries";
import { TypeEspace } from "@/lib/directus/directusModels";

export default async function Page({ params }: { params: { typeEspaceSlug: string } }) {
  const aideDecisionEtapes = await getAideDecisionEtapeByTypeEspaceSlug(params.typeEspaceSlug);

  if (aideDecisionEtapes && aideDecisionEtapes.length > 0) {
    const typeEspace = aideDecisionEtapes[0].type_espace_id as TypeEspace;
    return (
      <>
        <h1>{typeEspace.question_suivante}</h1>
        {aideDecisionEtapes.map((aideDecision) => (
          <div key={aideDecision.id}>
            <Link href={`/aide-decision/${typeEspace.slug}/${aideDecision.slug}`}>{aideDecision.nom}</Link>
          </div>
        ))}
      </>
    );
  } else {
    return <></>;
  }
}
