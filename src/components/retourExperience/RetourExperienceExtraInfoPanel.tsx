import ItemRetourExperienceExtraInfo from "@/src/components/retourExperience/ItemRetourExperienceExtraInfo";
import ObjectifsDeveloppementDurable from "@/src/components/common/ObjectifsDeveloppementDurable";
import { getClimatLabelFromCode } from "@/src/helpers/retourExperience/climatRetourExperience";
import { getTemporaliteLabelFromCode } from "@/src/helpers/retourExperience/temporaliteRetourExperience";
import { RetourExperience } from "@/src/lib/strapi/types/api/retour-experience";
import { clsx } from "clsx";

export default function RetourExperienceExtraInfoPanel({
  retourExperience,
  className,
}: {
  retourExperience: RetourExperience;
  className?: string;
}) {
  return (
    <div
      className={clsx("ml-6 mt-6 flex flex-wrap text-sm md:block md:w-56 lg:ml-0 mb-4",  className)}
    >
      <ItemRetourExperienceExtraInfo
        title="Solutions"
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
