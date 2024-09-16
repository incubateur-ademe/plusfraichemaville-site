import CmsRichText from "@/src/components/common/CmsRichText";

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
    <>
      <div className={`mb-3 basis-1/2 md:basis-auto ${className}`}>
        <div className="font-bold">{title}</div>
        <CmsRichText label={content} />
      </div>
      <hr className="pb-4" />
    </>
  );
}
