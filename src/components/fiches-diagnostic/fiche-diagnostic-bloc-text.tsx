import clsx from "clsx";
import CmsRichText from "../common/CmsRichText";

type FicheDiagnosticBlocTextProps = {
  title: string;
  text?: string;
};

export const FicheDiagnosticBlocText = ({ text, title }: FicheDiagnosticBlocTextProps) => {
  return (
    <div className="grow basis-0">
      <h3 className={clsx("text-[1.375rem] leading-tight")}>{title}</h3>
      <CmsRichText label={text ?? ""} />
    </div>
  );
};
