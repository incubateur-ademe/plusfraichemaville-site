import { PropsWithChildren } from "react";

export const SourcingFilters = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative h-[12.5rem] md:h-[9.5rem] xl:h-[4.5rem]">
      <div className="mb-6 flex w-fit flex-wrap gap-4">{children}</div>
    </div>
  );
};
