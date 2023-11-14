export default async function CustomDSFRQuote({
  texte,
  auteur,
  className,
}: {
  texte: string;
  auteur: string;
  className?: string;
}) {
  return (
    <figure className={`fr-quote ${className}`}>
      <blockquote>
        <div dangerouslySetInnerHTML={{ __html: `${texte}` }} />
      </blockquote>
      <figcaption>
        <div className="fr-quote__author">{auteur}</div>
      </figcaption>
    </figure>
  );
}
