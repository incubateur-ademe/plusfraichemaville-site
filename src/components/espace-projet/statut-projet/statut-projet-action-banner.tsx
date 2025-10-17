import Image from "next/image";
import clsx from "clsx";
import { PropsWithChildren } from "react";

export default function StatutProjetActionBanner({
  children,
  imagePath,
  className,
}: {
  imagePath: string;
  className?: string;
} & PropsWithChildren) {
  return (
    <div
      className={clsx(
        "w-full rounded-2xl p-10 text-center md:text-start",
        "bg-dsfr-background-contrast-info shadow-pfmv-card-shadow",
        "flex flex-col items-center gap-4 md:flex-row md:gap-16",
        "hover:bg-dsfr-background-contrast-info hover:shadow-pfmv-card-strong-shadow",
        "bg-[url(/images/espace-projet/statut/action-banner-bg.svg)] bg-right-bottom bg-no-repeat",
        className,
      )}
    >
      <div className="">
        <Image src={imagePath} alt="" width={350} height={300} className="relative hidden max-w-[30rem] md:block" />
      </div>
      <div className={"max-w-[35rem] text-wrap"}>{children}</div>
    </div>
  );
}
