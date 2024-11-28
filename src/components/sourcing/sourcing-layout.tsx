import { PropsWithChildren } from "react";
import { SourcingLayoutButton } from "./sourcing-layout-button";

export const SourcingLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="fr-container pt-8">
      <div className="mb-10">{children}</div>
      <SourcingLayoutButton />
    </div>
  );
};
