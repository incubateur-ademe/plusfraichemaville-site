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
    <div className={clsx(small && "md:w-1/2")}>
      <h3 className={clsx("text-2xl md:text-2xl", withPicto && "flex flex-row", titleClassName)}>
        {withPicto && <i className={"fr-icon-success-fill fr-icon--sm mr-2 text-dsfr-action-high-red-hover "} />}

        {title}
      </h3>
      <CmsRichText label={text ?? ""} className={textClassName} />
    </div>
  );
};
