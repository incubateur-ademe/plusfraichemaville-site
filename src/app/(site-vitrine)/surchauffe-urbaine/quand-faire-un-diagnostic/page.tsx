import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { SurchauffeUrbaineTimingComponent } from "@/src/components/surchauffe-urbaine/surchauffe-urbaine-timing-component";
import { SurchauffeUrbaineStoriesComponent } from "@/src/components/surchauffe-urbaine/surchauffe-urbaine-stories-component";
import { SurchauffeUrbaineDiagModuleIncentive } from "@/src/components/surchauffe-urbaine/diagnostic-module-incentive/surchauffe-urbaine-diag-module-incentive";

export const metadata: Metadata = computeMetadata("Pourquoi et quand faire un diagnostic ?");

export default async function SurchauffeUrbaineTimingPage() {
  return (
    <>
      <div className="fr-container">
        <h1 className="mt-8 text-center text-[1.75rem] font-bold text-dsfr-text-title-grey">
          Pourquoi et quand faire un diagnostic ?
        </h1>
        <div className="mx-auto max-w-[43rem] text-center  text-lg">
          Le diagnostic de la surchauffe urbaine est une étape essentielle, quelle que soit l’échelle de votre projet.
        </div>
      </div>
      <SurchauffeUrbaineTimingComponent className="mt-12" />
      <SurchauffeUrbaineDiagModuleIncentive className="mt-12" />
      <SurchauffeUrbaineStoriesComponent className="mt-12" />
    </>
  );
}
