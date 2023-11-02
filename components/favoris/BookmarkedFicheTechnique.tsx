import FicheTechniqueCardWithUserInfo from "@/components/aideDecision/ficheTechniqueCardWithUserInfo";
import FicheTechniqueCard from "@/components/aideDecision/ficheTechniqueCard";
import { useEffect, useState } from "react";
import { FicheTechnique } from "@/lib/directus/directusModels";

export default function BookmarkedFicheTechniqueByProject({
  projectName,
  ficheTechniqueSlugs,
}: {
  projectName: string;
  ficheTechniqueSlugs: string[];
}) {
  const [ficheTechniques, setFicheTechniques] = useState<FicheTechnique[]>([]);
  useEffect(() => {
    fetch(`/api/get-fiches-techniques?ficheTechniqueSlugs=${JSON.stringify(ficheTechniqueSlugs)}`)
      .then((res) => res.json())
      .then((fichesTechniques) => setFicheTechniques(fichesTechniques));
  }, [ficheTechniqueSlugs]);
  if (ficheTechniques?.length > 0) {
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
