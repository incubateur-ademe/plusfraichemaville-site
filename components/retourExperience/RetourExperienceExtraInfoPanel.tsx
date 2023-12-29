import ItemRetourExperienceExtraInfo from "@/components/retourExperience/ItemRetourExperienceExtraInfo";
import ObjectifsDeveloppementDurable from "@/components/common/ObjectifsDeveloppementDurable";
import { APIResponseData } from "@/lib/strapi/types/types";

export default async function RetourExperienceExtraInfoPanel({
  retourExperience,
  className,
}: {
  retourExperience: APIResponseData<"api::retour-experience.retour-experience">;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap md:block md:w-56 ml-6 lg:ml-0
      mt-6 text-dsfr-text-label-blue-france text-sm ${className}`}
    >
      <ItemRetourExperienceExtraInfo
        title="Solutions"
        content={retourExperience.attributes.types_solutions?.join(" · ")}
      />
      <hr className="pb-4" />
      <ItemRetourExperienceExtraInfo title="Échelle du projet" content={retourExperience.attributes.echelle} />
      <hr className="pb-4" />
      <ItemRetourExperienceExtraInfo title="Temporalité du projet" content={retourExperience.attributes.temporalite} />
      <hr className="pb-4" />
      <ItemRetourExperienceExtraInfo title="Climat actuel" content={retourExperience.attributes.climat_actuel} />
      <hr className="pb-4" />
      <ItemRetourExperienceExtraInfo title="Climat futur" content={retourExperience.attributes.climat_futur} />
      <hr className="pb-4" />
      <ItemRetourExperienceExtraInfo title="Coût global" content={retourExperience.attributes.cout} />
      <hr className="pb-4" />
      <ItemRetourExperienceExtraInfo title="Contact" content={retourExperience.attributes.contact} />
      <hr className="pb-4" />
      <ItemRetourExperienceExtraInfo title="Porteur du projet" content={retourExperience.attributes.porteur} />
      <hr className="pb-4" />
      <ObjectifsDeveloppementDurable objectifs={retourExperience.attributes.odds?.data} imageSize={65} />
    </div>
  );
}
