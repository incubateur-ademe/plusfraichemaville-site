import Badge from "@codegouvfr/react-dsfr/Badge";

export const SourcingRexSidePanelSkeleton = () => {
  return (
    <div className="p-5">
      <h2 className="mb-4 text-xl font-bold text-pfmv-navy">Le projet</h2>
      <div className="pfmv-card-no-hover w-[362px] overflow-hidden">
        <div className="h-36 animate-pulse overflow-hidden bg-dsfr-contrast-grey"></div>
        <div className="px-6 py-4">
          <Badge small noIcon severity="success" className="mb-2">
            Projet réalisé
          </Badge>
          <h3 className="mb-4 text-lg font-bold">
            <span className="mb-2 block h-5 w-36 rounded-md bg-dsfr-contrast-grey"></span>
            <span className="mb-2 block h-5 w-36 rounded-md bg-dsfr-contrast-grey"></span>
            <span className="mb-2 block h-5 w-36 rounded-md bg-dsfr-contrast-grey"></span>
          </h3>
          <div className="h-5 w-[100px] animate-pulse rounded-xl bg-dsfr-contrast-grey px-2 py-[2px]"></div>
        </div>
      </div>
    </div>
  );
};
