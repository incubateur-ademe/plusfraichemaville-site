import TypeEspaceFilter from "@/components/filters/TypeEspaceFilter";
import RegionFilter from "@/components/filters/RegionFilter";
import RetourExperienceCard from "@/components/retourExperience/RetourExperienceCard";
import { getRetoursExperiences } from "@/lib/strapi/queries/retoursExperienceQueries";

export default async function RetoursExperiences({
  searchParams,
}: {
  searchParams: { espaceFilter: string | undefined; regionFilter: string | undefined };
}) {
  const allRetoursExperiences = await getRetoursExperiences();
  const filteredRetoursExperiences = allRetoursExperiences
    .filter((re) => !searchParams.espaceFilter || re.attributes.types_espaces?.includes(searchParams.espaceFilter))
    .filter(
      (re) =>
        !searchParams.regionFilter ||
        (re.attributes.region?.data.attributes.code &&
          searchParams.regionFilter?.split(",").includes(re.attributes.region.data.attributes.code)),
    );

  return (
    <div className="fr-container">
      <TypeEspaceFilter className="justify-center mb-8 mt-8" />
      <div className="flex flex-col md:flex-row">
        <RegionFilter className="md:w-[13rem]" />
        <div className="grow list-none flex-wrap justify-center p-0">
          <ul className="flex grow list-none flex-wrap justify-center p-0 gap-6">
            {filteredRetoursExperiences.map((retourExperience) => (
              <li key={retourExperience.id}>
                <RetourExperienceCard retourExperience={retourExperience} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
