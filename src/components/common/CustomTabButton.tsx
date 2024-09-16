export default async function CustomTabButton({
  label,
  isSelected,
  contentId,
  className,
}: {
  label: string;
  isSelected: boolean;
  contentId: string;
  className?: string;
}) {
  return (
    <button
      className={`customTab ${className}`}
      tabIndex={isSelected ? 0 : -1}
      role="tab"
      aria-selected={isSelected}
      aria-controls={contentId}
    >
      {label}
    </button>
  );
}
