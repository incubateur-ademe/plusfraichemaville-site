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
      <>
        <h3 className={"mt-8"}>{`Mes solutions pour ma recherche "${projectName}"`}</h3>
        <ul className="flex list-none flex-wrap justify-center p-0">
          {ficheSolutions.map((ficheSolution) => (
            <li key={ficheSolution.id} className="m-2 w-72 flex">
              <FicheSolutionCardWithUserInfo ficheSolution={ficheSolution} projectName={projectName} />
            </li>
          ))}
        </ul>
      </>
    );
  }
}
