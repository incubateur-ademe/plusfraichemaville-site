import { useApi } from "@/hooks/useApi";
import FicheSolutionCardWithUserInfo from "@/components/ficheSolution/FicheSolutionCardWithUserInfo";
import { APIResponseData } from "@/lib/strapi/types/types";

export default function BookmarkedFicheSolutionByProject({
  projectName,
  ficheSolutionIds,
}: {
  projectName: string;
  ficheSolutionIds: number[];
}) {
  // TODO: revoir la logique pour fetcher par route + useSWR
  const { data: ficheSolutions } = useApi<APIResponseData<"api::fiche-solution.fiche-solution">[]>(
    `/api/get-fiches-solutions?ficheSolutionIds=${JSON.stringify(ficheSolutionIds)}`,
  );
  if (ficheSolutions && ficheSolutions?.length > 0) {
    return (
      <div className="text-dsfr-text-title-grey">
        <div className={"fr-h3"}>
          {projectName ? `Mon projet « ${projectName} »` : "Mes solutions mises en favoris"}
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
