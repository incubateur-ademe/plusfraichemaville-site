import clsx from "clsx";
import Image from "next/image";
import { Badge } from "@codegouvfr/react-dsfr/Badge";

export const SourcingInProgressProjetSkeleton = () => {
  return (
    <div className="p-5">
      <div className="mb-4 text-xl font-bold text-pfmv-navy">Le projet</div>

      <div className={clsx("h-[17rem] w-full rounded-2xl border-[1px] border-dsfr-border-default-grey")}>
        <div>
          <div
            className={clsx(
              "flex h-24 w-full shrink-0 flex-row items-center justify-center",
              "gap-6 rounded-t-xl bg-dsfr-background-alt-blue-france",
            )}
          >
            <Image src={"/images/sourcing/side-panel/projet-in-progress.svg"} alt="" width={59} height={46} />
            <div className="text-pfmv-navy">Projet en cours</div>
          </div>
          <div className="px-4 py-4">
            <Badge small noIcon className="mb-2 !bg-dsfr-background-action-low-blue-france !text-pfmv-navy">
              Projet en cours
            </Badge>
            <div className="animate-pulse">
              <div className={"mt-4 h-3 w-3/5 rounded-xl bg-dsfr-background-contrast-grey-active opacity-30"} />
              <div className={"mt-4 h-3 w-4/5 rounded-xl bg-dsfr-background-contrast-grey-active opacity-30"} />
              <div className={"mt-8 h-3 w-full rounded-xl bg-dsfr-background-contrast-grey-active opacity-30"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
