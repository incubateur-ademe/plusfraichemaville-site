import clsx from "clsx";

export const CompletionLabelNotStarted = ({ className }: { className?: string }) => {
  return <div className={clsx("mb-2 text-xs text-dsfr-text-mention-grey", className)}>non complété</div>;
};

export const CompletionLabelInProgress = ({ className }: { className?: string }) => {
  return (
    <div className={clsx("text-xs text-dsfr-text-default-grey", className)}>
      <i className="fr-icon-time-fill mr-1 text-dsfr-background-flat-warning" />
      en cours
    </div>
  );
};

export const CompletionLabelCompleted = ({ className }: { className?: string }) => {
  return (
    <div className={clsx("text-xs text-dsfr-text-default-grey", className)}>
      <i className="fr-icon-success-fill mr-1 text-dsfr-background-action-high-success-hover" />
      complété
    </div>
  );
};
