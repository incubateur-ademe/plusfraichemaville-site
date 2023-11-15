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
    <div className={`mb-3 ${className}`}>
      <div className="font-bold">{title}</div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
