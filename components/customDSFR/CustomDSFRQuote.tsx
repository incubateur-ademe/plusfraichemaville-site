import { CitationRetourExperience } from "@/lib/directus/directusCustomModels";

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
        <div dangerouslySetInnerHTML={{ __html: `${citation.texte}` }} />
      </blockquote>
      <figcaption>
        <div className="fr-quote__author">{citation.auteur}</div>
      </figcaption>
    </figure>
  );
}
