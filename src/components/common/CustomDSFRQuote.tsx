import CmsRichText from "@/src/components/common/CmsRichText";
import { Citation } from "@/src/lib/strapi/types/components/common/Citation";

export default async function CustomDSFRQuote({ citation, className }: { citation: Citation; className?: string }) {
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
