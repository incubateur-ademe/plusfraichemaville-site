"use client";
import clsx from "clsx";
import { SURCHAUFFE_URBAINE_TIMINGS } from "@/src/components/surchauffe-urbaine/surchauffe-urbaine-timings";
import Image from "next/image";
import React from "react";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

export const SurchauffeUrbaineTimingComponent = ({ className }: { className?: string }) => {
  return (
    <div className={clsx("bg-dsfr-background-alt-blue-france py-10 text-center", className)}>
      <div className="mx-auto mb-12 mt-6 flex max-w-[65rem] flex-col gap-6 px-4 md:px-6">
        {SURCHAUFFE_URBAINE_TIMINGS.map((timing, index) => (
          <div key={timing.code} className="flex flex-col items-stretch md:flex-row md:gap-8">
            <div className="hidden w-36 flex-col items-center md:flex">
              <div className="flex size-[6.5rem] justify-center rounded-2xl border border-pfmv-navy bg-white">
                <Image width={70} height={70} src={timing.image} alt={timing.title} className="rounded-xl" />
              </div>
              <h2 className="mt-3 !text-lg font-bold !leading-normal text-pfmv-navy">{timing.title}</h2>

              {index < SURCHAUFFE_URBAINE_TIMINGS.length - 1 && (
                <div className="w-1 grow rounded-full bg-dsfr-background-action-low-blue-france"></div>
              )}
            </div>
            <div className={clsx("flex-1", index < SURCHAUFFE_URBAINE_TIMINGS.length - 1 ? "pb-4 md:pb-12" : "")}>
              <div className="h-full rounded-2xl bg-white text-left md:h-auto md:p-6">
                <h2 className="mb-4 text-xl font-bold text-pfmv-navy md:hidden">{timing.title}</h2>
                {timing.description}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fr-container text-center">
        Pour aller plus loin sur la surchauffe urbaine
        <LinkWithoutPrefetch
          className="ml-2 !text-pfmv-navy after:hidden"
          download
          target="_blank"
          href="https://cdn.plusfraichemaville.fr/Guide_diagnostic_Surchauffe_Urbaine_202406.pdf"
        >
          Télécharger le recueil de l’Ademe « Diagnostic de la surchauffe urbaine »
          <i className="ri-download-2-line size-4 before:!mb-1 before:ml-2 before:!size-4" />
        </LinkWithoutPrefetch>
      </div>
    </div>
  );
};
