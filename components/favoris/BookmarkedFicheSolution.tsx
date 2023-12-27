import { FicheSolution } from "@/lib/directus/directusModels";
import { useApi } from "@/hooks/useApi";
import FicheSolutionCardWithUserInfo from "@/components/ficheSolution/FicheSolutionCardWithUserInfo";

export default function BookmarkedFicheSolutionByProject({
  projectName,
  ficheSolutionIds,
}: {
  projectName: string;
  ficheSolutionIds: number[];
}) {
  const { data: ficheSolutions } = useApi<FicheSolution[]>(
    `/api/get-fiches-solutions?ficheSolutionIds=${JSON.stringify(ficheSolutionIds)}`,
  );
  if (ficheSolutions && ficheSolutions?.length > 0) {
    return (
      <div className="text-dsfr-text-title-grey">
        <div className={"fr-h3"}>
          {projectName ? `Mon projet « ${projectName} »` : "Mes autres solutions mises en favoris"}
        </div>
        <div className="mb-6">
          {projectName
            ? `Vous avez sauvegardé ces solutions pour l'espace  « ${projectName} »`
            : "Vous avez sauvegardé ces solutions"}
        </div>
        <ul className="flex list-none flex-wrap justify-center md:justify-normal p-0 gap-6">
          {ficheSolutions.map((ficheSolution) => (
            <li key={ficheSolution.id} className="flex">
              <FicheSolutionCardWithUserInfo ficheSolution={ficheSolution} projectName={projectName} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
