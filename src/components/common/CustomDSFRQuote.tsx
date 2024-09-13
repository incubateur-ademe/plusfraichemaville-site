import CmsRichText from "@/components/common/CmsRichText";
import { GetValues } from "@/lib/strapi/types/types";

export default async function CustomDSFRQuote({
  citation,
  className,
}: {
  citation: GetValues<"common.citation">;
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
