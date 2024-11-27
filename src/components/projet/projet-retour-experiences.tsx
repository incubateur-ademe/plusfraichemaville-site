import RegionFilter from "@/src/components/filters/RegionFilter";
import RetourExperienceCard from "@/src/components/retourExperience/RetourExperienceCard";
import { getRetoursExperiences } from "@/src/lib/strapi/queries/retoursExperienceQueries";
import TypeEspaceFilter from "../filters/type-espace-filter-component";

export default async function RetoursExperiences({
  searchParams,
}: {
  searchParams: { espaceFilter: string | undefined; regionFilter: string | undefined };
}) {
  const allRetoursExperiences = await getRetoursExperiences();
  const filteredRetoursExperiences = allRetoursExperiences
    // @ts-ignore
    .filter((re) => !searchParams.espaceFilter || re.attributes.types_espaces?.includes(searchParams.espaceFilter))
    .filter(
      (re) =>
        !searchParams.regionFilter ||
        (re.attributes.region?.data.attributes.code &&
          searchParams.regionFilter?.split(",").includes(re.attributes.region.data.attributes.code)),
    );

  return (
    <div className="fr-container">
      <TypeEspaceFilter className="mb-8 mt-8 flex justify-center md:ml-52 md:justify-normal" />
      <div className="flex flex-col md:flex-row">
        <RegionFilter className="mb-6 md:min-w-[13rem]" />
        {filteredRetoursExperiences.length === 0 ? (
          <div className="text-xl font-bold">{"Aucun retour d'expérience ne correspond à vos critères."}</div>
        ) : (
          <div className="grow list-none flex-wrap justify-center p-0">
            <ul className="flex grow list-none flex-wrap justify-center gap-6 p-0 md:justify-normal">
              {filteredRetoursExperiences.map((retourExperience) => (
                <li key={retourExperience.id}>
                  <RetourExperienceCard retourExperience={retourExperience} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
