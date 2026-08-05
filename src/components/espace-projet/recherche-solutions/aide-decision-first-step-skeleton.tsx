export const AideDecisionFirstStepSkeleton = () => {
  return (
    <ul className="flex list-none flex-wrap justify-center gap-6">
      {Array.from({ length: 7 }).map((_, index) => (
        <li key={index} className="flex justify-center p-0">
          <div className="rounded-2xl size-32 animate-pulse bg-dsfr-background-contrast-grey-active" />
        </li>
      ))}
    </ul>
  );
};
