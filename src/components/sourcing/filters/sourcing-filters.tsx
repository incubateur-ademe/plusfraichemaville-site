import { PropsWithChildren } from "react";

export const SourcingFilters = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative min-h-20">
      <div className="mb-6 flex w-fit flex-wrap gap-4">{children}</div>
    </div>
  );
};
