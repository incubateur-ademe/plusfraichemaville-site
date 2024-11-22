import { PropsWithChildren } from "react";

export const SourcingFilters = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative h-20">
      <div className="mb-6 flex w-fit gap-4">{children}</div>
    </div>
  );
};
