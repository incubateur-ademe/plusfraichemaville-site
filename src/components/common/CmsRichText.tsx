import clsx from "clsx";

export default function CmsRichText({ label, className }: { label: string; className?: string }) {
  return <div className={clsx("cmsRichText", className)} dangerouslySetInnerHTML={{ __html: `${label}` }} />;
}
