export const FicheDiagnosticCardSkeleton = () => {
  return (
    <div className="pfmv-card h-[25rem] w-72 bg-white">
      <div className="animate-pulse">
        <div className="h-40 w-full shrink-0 rounded-t-xl bg-dsfr-contrast-grey"></div>
        <div className="mx-auto mt-8 h-3 w-4/5 rounded-xl bg-dsfr-contrast-grey" />
        <div className="mx-auto mt-4 h-3 w-4/5 rounded-xl bg-dsfr-contrast-grey" />
        <div className="mx-auto mt-4 h-3 w-4/5 rounded-xl bg-dsfr-contrast-grey" />
      </div>
    </div>
  );
};
