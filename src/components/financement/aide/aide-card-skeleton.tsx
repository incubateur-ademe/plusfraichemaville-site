export const AideCardSkeleton = () => {
  return (
    <div className="pfmv-card no-shadow h-[26rem] w-[362px] shrink-0 animate-pulse hover:outline-none">
      <div className="mb-5 h-24 rounded-t-2xl  bg-dsfr-contrast-grey"></div>
      <div className="p-5">
        <div className="mb-4 h-6 w-14 rounded-sm bg-dsfr-contrast-grey"></div>
        <div className="mb-2 h-4 w-full rounded-sm bg-dsfr-contrast-grey"></div>
        <div className="mb-2 h-4 w-full rounded-sm bg-dsfr-contrast-grey"></div>
        <div className="mb-6 h-4 w-full rounded-sm bg-dsfr-contrast-grey"></div>
      </div>
    </div>
  );
};
