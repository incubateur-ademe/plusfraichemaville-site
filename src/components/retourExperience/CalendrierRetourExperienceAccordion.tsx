import Accordion from "@codegouvfr/react-dsfr/Accordion";
import CmsRichText from "@/components/common/CmsRichText";
import { GetValues } from "@/lib/strapi/types/types";

export default async function CalendrierRetourExperienceAccordion({
  etapes,
  className,
}: {
  etapes: GetValues<"retour-experience.calendrier">[];
  className?: string;
}) {
  return etapes.map((etape) => (
    <Accordion
      className={`${className}`}
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
