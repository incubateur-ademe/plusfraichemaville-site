export default async function ItemRetourExperience({
  title,
  content,
  level,
}: {
  title: string;
  content?: string | null;
  level: "title" | "subtitle";
}) {
  const TitleTag = level === "title" ? "h2" : "h3";
  const titleClasses = level === "title" ? "text-3xl mt-10 mb-3" : "text-xl mt-5 mb-2";

  return !content ? null : (
    <>
      <TitleTag className={titleClasses}>{title}</TitleTag>
      <div className="cmsRichText" dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
}
