import Badge from "@codegouvfr/react-dsfr/Badge";
import clsx from "clsx";

type FicheDiagnosticBadgeProps = {
  className?: string;
};

export const FicheDiagnosticBadge = ({ className }: FicheDiagnosticBadgeProps) => (
  <Badge className={clsx("bg-dsfr-yellow-moutarde-diagnostic text-dsfr-text-title-grey", className)}>Diagnostic</Badge>
);
