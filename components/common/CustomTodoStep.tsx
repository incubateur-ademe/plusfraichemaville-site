import React from "react";
import CmsRichText from "@/components/common/CmsRichText";

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
        <i className={`fr-icon-success-fill fr-icon--sm text-dsfr-text-disabled-grey mr-2 mt-[2px]`} />
        <span className="text-lg font-bold text-dsfr-text-title-grey">{title}</span>
      </div>
      <div>
        <CmsRichText label={label} className="text-sm text-dsfr-text-title-grey" />
      </div>
    </div>
  );
}
