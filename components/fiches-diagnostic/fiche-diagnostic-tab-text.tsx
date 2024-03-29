import clsx from "clsx";
import CmsRichText from "../common/CmsRichText";

type FicheDiagnosticTabBlocTextProps = {
  title: string;
  text?: string;
  textClassName?: string;
  titleClassName?: string;
  small?: boolean;
  withPicto?: boolean;
};

export const FicheDiagnosticTabBlocText = ({
  text,
  title,
  textClassName,
  titleClassName,
  small,
  withPicto,
}: FicheDiagnosticTabBlocTextProps) => {
  return (
    <div className={clsx(small && "w-1/2")}>
      <h3 className={clsx("text-2xl", withPicto && "flex items-center", titleClassName)}>
        {withPicto && <PictoTick />}

        {title}
      </h3>
      <CmsRichText label={text ?? ""} className={textClassName} />
    </div>
  );
};

const PictoTick = () => (
  <svg
    className="inline mr-2"
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
  >
    <path
      d={clsx(
        "M8.49935 15.5827C4.58733 15.5827 1.41602 12.4113 1.41602 8.49935C1.41602 4.58733",
        "4.58733 1.41602 8.49935 1.41602C12.4113 1.41602 15.5827 4.58733 15.5827 8.49935C15.5827",
        "12.4113 12.4113 15.5827 8.49935 15.5827ZM7.79286 11.3327L12.8016",
        "6.32401L11.7998 5.32228L7.79286 9.32923L5.78941 7.32571L4.78768 8.32751L7.79286 11.3327Z",
      )}
      fill="#FF2725"
    />
  </svg>
);
