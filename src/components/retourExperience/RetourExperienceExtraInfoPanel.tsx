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
    <div className={clsx("mb-4 ml-6 mt-6 flex flex-wrap text-sm md:block md:w-56 lg:ml-0", className)}>
      <ItemRetourExperienceExtraInfo title="Solutions" content={retourExperience.types_solutions?.join(" · ")} />
      <ItemRetourExperienceExtraInfo title="Échelle du projet" content={retourExperience.echelle} />
      <ItemRetourExperienceExtraInfo
        title="Temporalité du projet"
        content={getTemporaliteLabelFromCode(retourExperience.temporalite)}
      />
      <ItemRetourExperienceExtraInfo
        title="Climat actuel"
        content={getClimatLabelFromCode(retourExperience.climat_actuel)}
      />
      <ItemRetourExperienceExtraInfo
        title="Climat futur"
        content={getClimatLabelFromCode(retourExperience.climat_futur)}
      />
      <ItemRetourExperienceExtraInfo title="Coût global" content={retourExperience.cout} />
      <ItemRetourExperienceExtraInfo title="Contact" content={retourExperience.contact} />
      <ItemRetourExperienceExtraInfo title="Porteur du projet" content={retourExperience.porteur} />
      <ObjectifsDeveloppementDurable objectifs={retourExperience.odds} imageSize={65} />
    </div>
  );
}
