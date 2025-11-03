import clsx from "clsx";
import { PropsWithChildren } from "react";
import { PartageOverviewMemberInviteButton } from "./partage-overview-member-invite-button";

type PartageOverviewWrapperProps = {
  withSharingOption?: boolean;
  currentUserIsAdmin?: boolean;
} & PropsWithChildren;

export const PartageOverviewWrapper = ({ withSharingOption, children }: PartageOverviewWrapperProps) => {
  return (
    <div className="pfmv-strong-card relative rounded-2xl bg-white p-8">
      <div className="flex items-center justify-between pb-5">
        {withSharingOption && <PartageOverviewMemberInviteButton />}
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
