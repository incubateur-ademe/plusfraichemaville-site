import { RetourExperience } from "@/lib/directus/directusModels";
import ItemRetourExperienceExtraInfo from "@/components/retourExperience/ItemRetourExperienceExtraInfo";
import ObjectifsDeveloppementDurable from "@/components/ficheTechnique/ObjectifsDeveloppementDurable";

export default async function RetourExperienceExtraInfoPanel({
  retourExperience,
  className,
}: {
  retourExperience: RetourExperience;
  className?: string;
}) {
  return (
    <div
      className={`flex-wrap md:flex-none md:w-64 bg-dsfr-background-yellow
      pl-6 pt-6 text-dsfr-text-label-blue-france text-sm ${className}`}
    >
      <ItemRetourExperienceExtraInfo title="Solutions" content={retourExperience.types_solution?.join(" · ")} />
      <ItemRetourExperienceExtraInfo title="Échelle du projet" content={retourExperience.echelle} />
      <ItemRetourExperienceExtraInfo title="Temporalité du projet" content={retourExperience.temporalite} />
      <ItemRetourExperienceExtraInfo title="Climat actuel" content={retourExperience.climat_actuel} />
      <ItemRetourExperienceExtraInfo title="Climat futur" content={retourExperience.climat_futur} />
      <ItemRetourExperienceExtraInfo title="Coût global" content={retourExperience.cout} />
      <ItemRetourExperienceExtraInfo title="Contact" content={retourExperience.contact} />
      <ItemRetourExperienceExtraInfo title="Porteur du projet" content={retourExperience.porteur} />
      <ObjectifsDeveloppementDurable objectifs={retourExperience.odd} imageSize={65} className={"font-bold"} />
    </div>
  );
}
