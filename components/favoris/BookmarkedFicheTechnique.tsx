import FicheTechniqueCardWithUserInfo from "@/components/aideDecision/FicheTechniqueCardWithUserInfo";
import FicheTechniqueCard from "@/components/aideDecision/FicheTechniqueCard";
import { FicheTechnique } from "@/lib/directus/directusModels";
import { useApi } from "@/hooks/useApi";

export default function BookmarkedFicheTechniqueByProject({
  projectName,
  ficheTechniqueIds,
}: {
  projectName: string;
  ficheTechniqueIds: number[];
}) {
  const { data: ficheTechniques } = useApi<FicheTechnique[]>(
    `/api/get-fiches-techniques?ficheTechniqueIds=${JSON.stringify(ficheTechniqueIds)}`,
  );
  if (ficheTechniques && ficheTechniques?.length > 0) {
    return (
      <>
        <h3 className={"mt-8"}>{`Mes solutions pour ma recherche "${projectName}"`}</h3>
        <ul className="flex list-none flex-wrap justify-center p-0">
          {ficheTechniques.map((ficheTechnique) => (
            <li key={ficheTechnique.id} className="m-2 w-72 flex">
              <FicheTechniqueCardWithUserInfo ficheTechnique={ficheTechnique} aideDecisionFirstStepName={projectName}>
                <FicheTechniqueCard ficheTechnique={ficheTechnique} />
              </FicheTechniqueCardWithUserInfo>
            </li>
          ))}
        </ul>
      </>
    );
  }
}
