import CmsRichText from "../common/CmsRichText";

type FicheDiagnosticBlocTextProps = {
  title: string;
  text?: string;
};

export const FicheDiagnosticBlocText = ({ text, title }: FicheDiagnosticBlocTextProps) => {
  return (
    <div className="grow basis-0">
      <h2 className="fr-h2">{title}</h2>
      <CmsRichText label={text ?? ""} />
    </div>
  );
};
