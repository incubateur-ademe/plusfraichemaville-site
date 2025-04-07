import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { SurchauffeUrbaineLinkComponent } from "@/src/components/surchauffe-urbaine/surchauffe-urbaine-link-component";
import Button from "@codegouvfr/react-dsfr/Button";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { TeaserDiagnosticComponent } from "@/src/components/surchauffe-urbaine/teaser-diagnostic-component";

export const metadata: Metadata = computeMetadata("Introduction à la surchauffe urbaine");

export default async function SurchauffeUrbaineIntrductionPage() {
  return (
    <>
      <div className="fr-container">
        <h1 className="mt-8 text-center text-[1.75rem] font-bold text-dsfr-text-title-grey">
          Surchauffe urbaine : <br /> la ville dans une France à +4°C
        </h1>
        <div className="mx-auto max-w-[45rem] text-center  text-lg">
          {`La surchauffe urbaine est l'ensemble des phénomènes qui rendent la chaleur plus intense en ville pendant les
        périodes de forte chaleur. Elle est causée par l'effet d'îlot de chaleur urbain, les surfaces minérales, le
        manque de ventilation et le rayonnement solaire. D'après la Trajectoire de Réchauffement et d’Adaptation au
        Changement Climatique adoptée en 2024, la France pourrait connaître une hausse de +4°C d'ici 2100. Une évolution
        qui accentuerait fortement l'inconfort des espaces urbains pour les citadins. Identifier les zones à risques et
        adapter ces espaces est essentiel pour protéger la santé et le bien-être de tous.`}
        </div>
      </div>
      <SurchauffeUrbaineLinkComponent className="mb-20 flex justify-center" />
      <div className="bg-dsfr-background-alt-blue-france py-10 text-center">
        <div className="text-center text-[1.375rem] font-bold text-pfmv-navy">
          Votre collectivité est confrontée à un problème de surchauffe urbaine ?
        </div>
        <Button className="mt-4 rounded-3xl" linkProps={{ href: PFMV_ROUTES.ESPACE_PROJET }}>
          {"Démarrer sur l'espace projet !"}
        </Button>
      </div>
      <TeaserDiagnosticComponent className="mt-8" />
    </>
  );
}
