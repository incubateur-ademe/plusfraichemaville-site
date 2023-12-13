import { CitationRetourExperience } from "@/lib/directus/directusCustomModels";
import CmsRichText from "@/components/common/CmsRichText";

export default async function CustomDSFRQuote({
  citation,
  className,
}: {
  citation: CitationRetourExperience;
  className?: string;
}) {
  return (
    <figure className={`fr-quote ${className}`}>
      <blockquote>
        <CmsRichText label={citation.texte} />
      </blockquote>
      <figcaption>
        <div className="fr-quote__author">{citation.auteur}</div>
      </figcaption>
    </figure>
  );
}
