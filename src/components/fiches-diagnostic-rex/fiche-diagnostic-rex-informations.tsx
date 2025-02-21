import { RetourExperienceDiagnostic } from "@/src/lib/strapi/types/api/retour-experience-diagnostic";
import CmsRichText from "../common/CmsRichText";
type FicheDiagnosticRexInformationsProps = {
  rex: RetourExperienceDiagnostic;
};
export const FicheDiagnosticRexInformations = ({ rex }: FicheDiagnosticRexInformationsProps) => {
  const informations = [
    {
      title: "Collectivité concernée",
      description: rex.attributes.collectivite_info,
    },
    {
      title: "Climat",
      description: (
        <>
          <span className="block text-sm">Actuel : {rex.attributes.climat_actuel}</span>
          <span className="block text-sm">Futur : {rex.attributes.climat_futur}</span>
        </>
      ),
    },
    {
      title: "Année de réalisation",
      description: rex.attributes.annee_realisation,
    },
    {
      title: "Coûts",
      description: rex.attributes.cout_description,
    },
    {
      title: "Financement",
      description: rex.attributes.financements,
    },
  ];

  return (
    <>
      {informations.map((information, index) => (
        <div
          className="mb-4 w-full border-b-[1px] border-dsfr-border-default-grey pb-4 text-pfmv-navy lg:w-56"
          key={index}
        >
          <h4 className="mb-1 text-sm font-bold text-pfmv-navy">{information.title}</h4>
          {typeof information.description === "string" ? (
            <CmsRichText label={information.description} className="text-sm [&_p]:mb-0" />
          ) : (
            information.description
          )}
        </div>
      ))}
    </>
  );
};
