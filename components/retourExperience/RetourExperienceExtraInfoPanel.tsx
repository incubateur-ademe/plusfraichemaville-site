import ItemRetourExperienceExtraInfo from "@/components/retourExperience/ItemRetourExperienceExtraInfo";
import ObjectifsDeveloppementDurable from "@/components/common/ObjectifsDeveloppementDurable";
import { APIResponseData } from "@/lib/strapi/types/types";
import { getClimatLabelFromCode } from "@/helpers/retourExperience/climatRetourExperience";
import { getTemporaliteLabelFromCode } from "@/helpers/retourExperience/temporaliteRetourExperience";

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
        // @ts-ignore
        content={retourExperience.attributes.types_solutions?.join(" · ")}
      />
      <ItemRetourExperienceExtraInfo title="Échelle du projet" content={retourExperience.attributes.echelle} />
      <ItemRetourExperienceExtraInfo
        title="Temporalité du projet"
        content={getTemporaliteLabelFromCode(retourExperience.attributes.temporalite)}
      />
      <ItemRetourExperienceExtraInfo
        title="Climat actuel"
        content={getClimatLabelFromCode(retourExperience.attributes.climat_actuel)}
      />
      <ItemRetourExperienceExtraInfo
        title="Climat futur"
        content={getClimatLabelFromCode(retourExperience.attributes.climat_futur)}
      />
      <ItemRetourExperienceExtraInfo title="Coût global" content={retourExperience.attributes.cout} />
      <ItemRetourExperienceExtraInfo title="Contact" content={retourExperience.attributes.contact} />
      <ItemRetourExperienceExtraInfo title="Porteur du projet" content={retourExperience.attributes.porteur} />
      <ObjectifsDeveloppementDurable objectifs={retourExperience.attributes.odds?.data} imageSize={65} />
    </div>
  );
}
