import Button from "@codegouvfr/react-dsfr/Button";
import clsx from "clsx";
import { PropsWithChildren } from "react";

type PartageOverviewWrapperProps = {
  title: string;
  withSharingOption?: boolean;
} & PropsWithChildren;

export const PartageOverviewWrapper = ({ title, withSharingOption, children }: PartageOverviewWrapperProps) => {
  return (
    <div className="relative rounded-2xl bg-white p-8">
      <div className="flex items-center justify-between pb-5">
        <h1 className="mb-0 text-[22px] text-pfmv-navy">{title}</h1>
        {withSharingOption && (
          <Button priority="primary" className="rounded-3xl">
            Inviter un membre
          </Button>
        )}
      </div>
      <div
        className={clsx(
          "bg-dsfr-background-contrast-blue-france text-sm font-bold text-pfmv-navy",
          "mb-4 flex h-12 items-center justify-between gap-0 pl-20",
        )}
      >
        <span className="w-full max-w-72">Membre</span>
        <span className="w-full max-w-72">Poste</span>
        <span className="w-full max-w-56">Rôle</span>
        <span className="w-full max-w-56">Statut</span>
      </div>
      {children}
    </div>
  );
};
