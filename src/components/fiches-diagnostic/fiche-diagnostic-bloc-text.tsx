import clsx from "clsx";
import CmsRichText from "../common/CmsRichText";

type FicheDiagnosticBlocTextProps = {
  title: string;
  text?: string;
};

export const FicheDiagnosticBlocText = ({ text, title }: FicheDiagnosticBlocTextProps) => {
  return (
    <div className="basis-0 grow">
      <h3 className={clsx("text-[1.375rem]")}>{title}</h3>
      <CmsRichText label={text ?? ""} />
    </div>
  );
};
