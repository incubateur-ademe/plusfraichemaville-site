"use client";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { computeFullEspaceProjetUrlFromSuffix } from "@/src/helpers/routes";

export const PresentationServicesLink = ({ linkLabel, linkUrl }: { linkLabel: string; linkUrl: string }) => {
  const projets = useProjetsStore((state) => state.projets);
  const onlyOneProjet = projets?.length === 1;

  return (
    <>
      {onlyOneProjet ? (
        <LinkWithoutPrefetch
          href={computeFullEspaceProjetUrlFromSuffix(linkUrl, projets[0]?.id)}
          className="text-pfmv-navy"
        >
          {linkLabel}
        </LinkWithoutPrefetch>
      ) : (
        <div className="w-15 h-10 animate-pulse rounded-3xl bg-dsfr-background-alt-grey" />
      )}
    </>
  );
};
