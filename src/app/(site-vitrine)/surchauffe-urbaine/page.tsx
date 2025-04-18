import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { SurchauffeUrbaineLinkComponent } from "@/src/components/surchauffe-urbaine/surchauffe-urbaine-link-component";
import { TeaserDiagnosticComponent } from "@/src/components/surchauffe-urbaine/teaser-diagnostic-component";
// eslint-disable-next-line max-len
import { SurchauffeUrbaineStoriesComponent } from "@/src/components/surchauffe-urbaine/surchauffe-urbaine-stories-component";

export const metadata: Metadata = computeMetadata("Introduction à la surchauffe urbaine");

export default async function SurchauffeUrbaineIntroductionPage() {
  return (
    <>
      <div className="fr-container">
        <h1 className="mt-8 text-center text-[1.75rem] font-bold text-dsfr-text-title-grey">
          Surchauffe urbaine : <br /> la ville dans une France à +4°C
        </h1>
        <div className="mx-auto max-w-[49rem] text-center text-lg">
          {`La surchauffe urbaine est l'ensemble des phénomènes qui rendent la chaleur plus intense en ville pendant les
        périodes de forte chaleur. Elle est causée par l'effet d'îlot de chaleur urbain, les surfaces minérales, le
        manque de ventilation et le rayonnement solaire. D’après la Trajectoire de Réchauffement et d’Adaptation au 
        Changement Climatique (TRACC) retenue par le Gouvernement en 2024, la France pourrait connaître une hausse de 
        +4°C d'ici 2100. Cette évolution accentuerait fortement l'inconfort des espaces urbains pour les citadins. 
        Identifier les zones à risques et adapter ces espaces est essentiel pour protéger la santé et le bien-être
         de tous.`}
        </div>
      </div>
      <SurchauffeUrbaineLinkComponent className="mb-9 mt-9 flex justify-center" />
      <SurchauffeUrbaineStoriesComponent />
      <TeaserDiagnosticComponent className="mt-8" />
    </>
  );
}
