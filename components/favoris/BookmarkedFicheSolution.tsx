import { FicheSolutionCardWithFetcher } from "../ficheSolution/fiche-solution-card-with-fetcher";

export default function BookmarkedFicheSolutionByProject({
  projectName,
  ficheSolutionIds,
}: {
  projectName: string;
  ficheSolutionIds: number[];
}) {
  return (
    <div className="text-dsfr-text-title-grey">
      <div className={"fr-h3"}>{projectName ? `Mon projet « ${projectName} »` : "Mes solutions mises en favoris"}</div>
      <div className="mb-6">
        {projectName
          ? `Vous avez sauvegardé ces solutions pour l'espace  « ${projectName} »`
          : "Vous avez sauvegardé ces solutions"}
      </div>
      <ul className="flex list-none flex-wrap justify-center gap-6 p-0 md:justify-normal">
        {ficheSolutionIds.map((ficheSolution) => (
          <li key={ficheSolution} className="flex">
            <FicheSolutionCardWithFetcher complete id={ficheSolution} projectName={projectName} />
          </li>
        ))}
      </ul>
    </div>
  );
}
