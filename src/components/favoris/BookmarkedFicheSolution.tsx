import { FicheSolutionCardWithFetcher } from "../ficheSolution/fiche-solution-card-with-fetcher";

export default function BookmarkedFicheSolutionByProject({
  projectName,
  ficheSolutionIds,
}: {
  projectName: string;
  ficheSolutionIds: number[];
}) {
  return (
    <ul className="flex list-none flex-wrap justify-center gap-6 p-0 py-2 md:justify-normal">
      {ficheSolutionIds.map((ficheSolution) => (
        <li key={ficheSolution} className="flex pb-0">
          <FicheSolutionCardWithFetcher complete id={ficheSolution} projectName={projectName} />
        </li>
      ))}
    </ul>
  );
}
