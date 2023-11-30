import { RetourExperience } from "@/lib/directus/directusModels";
import ItemRetourExperienceExtraInfo from "@/components/retourExperience/ItemRetourExperienceExtraInfo";
import ObjectifsDeveloppementDurable from "@/components/common/ObjectifsDeveloppementDurable";

export default async function RetourExperienceExtraInfoPanel({
  retourExperience,
  className,
}: {
  retourExperience: RetourExperience;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap md:block md:w-56 ml-6 lg:ml-0
      mt-6 text-dsfr-text-label-blue-france text-sm ${className}`}
    >
      <ItemRetourExperienceExtraInfo title="Solutions" content={retourExperience.types_solution?.join(" · ")} />
      <hr className="pb-4" />
      <ItemRetourExperienceExtraInfo title="Échelle du projet" content={retourExperience.echelle} />
      <hr className="pb-4" />
      <ItemRetourExperienceExtraInfo title="Temporalité du projet" content={retourExperience.temporalite} />
      <hr className="pb-4" />
      <ItemRetourExperienceExtraInfo title="Climat actuel" content={retourExperience.climat_actuel} />
      <hr className="pb-4" />
      <ItemRetourExperienceExtraInfo title="Climat futur" content={retourExperience.climat_futur} />
      <hr className="pb-4" />
      <ItemRetourExperienceExtraInfo title="Coût global" content={retourExperience.cout} />
      <hr className="pb-4" />
      <ItemRetourExperienceExtraInfo title="Contact" content={retourExperience.contact} />
      <hr className="pb-4" />
      <ItemRetourExperienceExtraInfo title="Porteur du projet" content={retourExperience.porteur} />
      <hr className="pb-4" />
      <ObjectifsDeveloppementDurable objectifs={retourExperience.odd} imageSize={65} className={"font-bold"} />
    </div>
  );
}
