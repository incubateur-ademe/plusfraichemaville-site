import { getRetourExperienceDiagStoriesBySlugs } from "@/src/lib/strapi/queries/retour-experience-diag-queries";
import clsx from "clsx";
import { SurchauffeUrbaineStories } from "@/src/components/surchauffe-urbaine/surchauffe-urbaine-stories";
import { isEmpty } from "@/src/helpers/listUtils";

export const SurchauffeUrbaineStoriesComponent = async ({ className }: { className?: string }) => {
  const rexDiagData = await getRetourExperienceDiagStoriesBySlugs([
    "mustardijon-reseau-stations",
    "nanterre-diag-icu-ifu",
    "grenoble-cartographie-icu-2020",
    "balade-sensible-toulon-la-seyne",
    "libourne-lcz-renaturation",
    "saint-omer-cool-towns-diagnostic",
  ]);
  return (
    <section className={clsx("bg-dsfr-background-alt-blue-france py-9 text-center", className)}>
      <h1 className="mb-8 text-center text-[1.375rem] font-bold text-pfmv-navy">
        Inspirez-vous des collectivités qui ont réalisé des diagnostics de surchauffe urbaine.
      </h1>
      {!isEmpty(rexDiagData) && <SurchauffeUrbaineStories rexDiagStories={rexDiagData} />}
    </section>
  );
};
