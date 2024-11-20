import CmsRichText from "@/src/components/common/CmsRichText";

export default async function CustomTodoStep({
  title,
  label,
  className,
}: {
  title: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="mb-1 flex flex-row">
        <i className={"fr-icon-success-fill fr-icon--sm mr-2 mt-[2px] text-dsfr-text-disabled-grey"} />
        <span className="text-lg font-bold text-dsfr-text-title-grey">{title}</span>
      </div>
      <div>
        <CmsRichText label={label} className="text-sm text-dsfr-text-title-grey" />
      </div>
    </div>
  );
}
