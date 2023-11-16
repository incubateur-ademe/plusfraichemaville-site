import { getRetoursExperiencesByFilter } from "@/lib/directus/queries/retoursExperienceQueries";
import RetourExperienceCard from "@/components/retourExperience/RetourExperienceCard";

export default async function RetoursExperience() {
  const allRetoursExperiences = await getRetoursExperiencesByFilter();
  return (
    <>
      <ul className="flex list-none flex-wrap justify-center p-0">
        {allRetoursExperiences.map((retourExperience) => (
          <li key={retourExperience.id} className="m-2 w-80 flex">
            <RetourExperienceCard retourExperience={retourExperience} />
          </li>
        ))}
      </ul>
    </>
  );
}
