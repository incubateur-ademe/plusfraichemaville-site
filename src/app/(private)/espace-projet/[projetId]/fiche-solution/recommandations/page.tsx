import { BREADCRUMB_SOLUTION_RECOMMANDATIONS } from "@/src/components/espace-projet/banner/breadcrumb-list/espace-projet-breadcurmb-solution";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";
import { RecommandationsFicheSolution } from "@/src/components/espace-projet/recommandations-solutions/recommandations-fiche-solution";

export default async function FichesSolutionsRecommandationsPage() {
  return (
    <>
      <BannerProjetBreadcrumb step={BREADCRUMB_SOLUTION_RECOMMANDATIONS} />
      <div className="fr-container pt-8">
        <h1 className="text-2xl">Recommandations</h1>
        <p className="mb-10">
          Aucune solution ne peut résoudre seule la problématique de la surchauffe urbaine. <br /> Nous vous proposons
          ici des solutions complémentaires à celles que vous avez choisies afin de créer les meilleures combinaisons et
          synergies possibles.
        </p>
        <RecommandationsFicheSolution />
      </div>
    </>
  );
}
