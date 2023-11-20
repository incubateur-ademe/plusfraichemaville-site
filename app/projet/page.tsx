import { getRetoursExperiences } from "@/lib/directus/queries/retoursExperienceQueries";
import RetourExperienceCustomCard from "@/components/retourExperience/RetourExperienceCustomCard";
import TypeEspaceFilter from "@/components/filters/TypeEspaceFilter";

export default async function RetoursExperience({
  searchParams,
}: {
  searchParams: { espaceFilter: string | undefined };
}) {
  const allRetoursExperiences = await getRetoursExperiences();
  const filteredRetoursExperiences = allRetoursExperiences.filter(
    (re) => !searchParams.espaceFilter || re.types_espace?.includes(searchParams.espaceFilter),
  );

  return (
    <>
      <TypeEspaceFilter className="justify-center mb-8" />
      <ul className="flex list-none flex-wrap justify-center p-0">
        {filteredRetoursExperiences.map((retourExperience) => (
          <li key={retourExperience.id} className="m-2 w-80 flex">
            <RetourExperienceCustomCard retourExperience={retourExperience} />
          </li>
        ))}
      </ul>
    </>
  );
}
