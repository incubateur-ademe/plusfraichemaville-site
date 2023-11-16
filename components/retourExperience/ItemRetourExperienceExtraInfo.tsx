export default async function ItemRetourExperienceExtraInfo({
  title,
  content,
  className,
}: {
  title: string;
  content?: string | null;
  className?: "string";
}) {
  return !content ? null : (
    <div className={`basis-1/2 md:basis-auto mb-3 ${className}`}>
      <div className="font-bold">{title}</div>
      <div className="cmsRichText" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
