import { PFMV_ROUTES } from "@/src/helpers/routes";
import { getRetourExperienceDiagStoriesBySlugs } from "@/src/lib/strapi/queries/retour-experience-diag-queries";
import Button from "@codegouvfr/react-dsfr/Button";
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
    <div className={clsx("bg-dsfr-background-alt-blue-france py-9 text-center", className)}>
      <div className="text-center text-[1.375rem] font-bold text-pfmv-navy">
        Votre collectivité est confrontée à un problème de surchauffe urbaine ?
      </div>
      <Button className="mb-12 mt-4 rounded-3xl" linkProps={{ href: PFMV_ROUTES.ESPACE_PROJET }}>
        {"Démarrer sur l'espace projet !"}
      </Button>
      {!isEmpty(rexDiagData) && <SurchauffeUrbaineStories rexDiagStories={rexDiagData} />}
    </div>
  );
};
