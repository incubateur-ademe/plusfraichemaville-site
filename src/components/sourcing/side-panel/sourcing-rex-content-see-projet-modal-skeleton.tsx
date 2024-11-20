export const SourcingRexContentSeeProjetModalSkeleton = () => {
  return (
    <>
      <div className="-mx-8 h-max animate-pulse">
        <div className="h-40 w-full bg-dsfr-background-contrast-grey-active opacity-30 md:h-96" />
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="ml-6 mt-6 flex w-56 flex-wrap text-sm md:block">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="mb-4 h-4 w-36 rounded-xl bg-dsfr-background-contrast-grey-active opacity-30" />
          ))}
        </div>

        <div className="flex-1 md:pl-12">
          <div className="mt-4 h-10 w-3/4 rounded-xl bg-dsfr-background-contrast-grey-active opacity-30" />

          <div className="mt-10">
            <div className="mb-2 h-4 w-full rounded-xl bg-dsfr-background-contrast-grey-active opacity-30" />
            <div className="mb-2 h-4 w-full rounded-xl bg-dsfr-background-contrast-grey-active opacity-30" />
            <div className="h-4 w-3/4 rounded-xl bg-dsfr-background-contrast-grey-active opacity-30" />
          </div>
        </div>
      </div>
    </>
  );
};
