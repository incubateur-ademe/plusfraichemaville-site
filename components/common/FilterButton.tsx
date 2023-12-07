export default function FilterButton({
  code,
  label,
  onClick,
  isSelected,
  className,
}: {
  code: string;
  label: string;
  onClick: () => void;
  isSelected: (_: string) => boolean;
  className?: string;
}) {
  const buttonStyle = (code: string) => {
    const baseStyle =
      " rounded-3xl px-4 py-2 bg-white mr-2 md:mr-4 mb-3 " +
      " border-solid border-white border-[1px] hover:text-dsfr-text-label-blue-france " +
      " hover:border-dsfr-text-label-blue-france hover:!bg-white ";
    return isSelected(code)
      ? " text-dsfr-text-label-blue-france !border-dsfr-text-label-blue-france " + baseStyle
      : baseStyle;
  };
  return (
    <button onClick={onClick} className={`${className} ${buttonStyle(code)}`}>
      {label}
    </button>
  );
}
