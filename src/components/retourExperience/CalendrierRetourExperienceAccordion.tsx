import Accordion from "@codegouvfr/react-dsfr/Accordion";
import CmsRichText from "@/src/components/common/CmsRichText";
import { Calendrier } from "@/src/lib/strapi/types/components/retour-experience/Calendrier";

export default async function CalendrierRetourExperienceAccordion({
  etapes,
  className,
}: {
  etapes: Calendrier[];
  className?: string;
}) {
  return etapes.map((etape, index) => (
    <Accordion
      className={`${className}`}
      key={index}
      label={
        <div className="flex">
          <div className="w-32 flex-none">{etape.date}</div>
          <div className="flex-1">{etape.titre}</div>
        </div>
      }
    >
      <CmsRichText label={etape.description || ""} />
    </Accordion>
  ));
}
