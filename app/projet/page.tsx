import { getRetoursExperiencesByFilter } from "@/lib/directus/queries/retoursExperienceQueries";
import RetourExperienceCustomCard from "@/components/retourExperience/RetourExperienceCustomCard";
import TypeEspaceFilter from "@/components/filters/TypeEspaceFilter";

export default async function RetoursExperience({
  searchParams,
}: {
  searchParams: { [espaceFilter: string]: string[] | undefined };
}) {
  const allRetoursExperiences = await getRetoursExperiencesByFilter();
  return (
    <>
      <TypeEspaceFilter className="justify-center mb-8" />
      <ul className="flex list-none flex-wrap justify-center p-0">
        {allRetoursExperiences.map((retourExperience) => (
          <li key={retourExperience.id} className="m-2 w-80 flex">
            <RetourExperienceCustomCard retourExperience={retourExperience} />
          </li>
        ))}
      </ul>
    </>
  );
}
