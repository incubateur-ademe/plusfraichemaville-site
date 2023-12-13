export default async function CmsRichText({ label, className }: { label: string; className?: string }) {
  return <div className={`cmsRichText ${className}`} dangerouslySetInnerHTML={{ __html: `${label}` }} />;
}
