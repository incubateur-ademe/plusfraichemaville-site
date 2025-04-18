import clsx from "clsx";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import Button from "@codegouvfr/react-dsfr/Button";
import { TeaserDiagnosticCard } from "@/src/components/surchauffe-urbaine/teaser-diagnostic-card";

export const TeaserDiagnosticComponent = ({ className }: { className?: string }) => {
  return (
    <div className={clsx(className, "mx-auto w-fit rounded-xl bg-dsfr-background-alt-blue-france p-4 text-center")}>
      <div className="mt-6 text-center text-[1.75rem] font-bold text-pfmv-navy">
        Lancez votre diagnostic directement depuis l’espace projet.
      </div>
      <Button className="mt-4 rounded-3xl" linkProps={{ href: PFMV_ROUTES.ESPACE_PROJET }}>
        {"Démarrer sur l'espace projet !"}
      </Button>
      <div className="fr-container mb-6 mt-12 flex flex-wrap justify-center gap-6">
        <TeaserDiagnosticCard
          imageUrl="/images/surchauffe-urbaine/surchauffe-teaser-analyse.jpg"
          title="Faites une analyse de la surchauffe sur votre espace"
          description="Accédez à notre outil de calcul d’indicateurs en ligne pour faire un état des lieux du site
           à rafraîchir."
        />
        <TeaserDiagnosticCard
          imageUrl="/images/surchauffe-urbaine/surchauffe-teaser-methodes.jpg"
          title="Découvrez les méthodes de diagnostic approfondi"
          description="Consultez les fiches méthodologiques pour identifier les prestations de diagnostic adaptées à
           votre projet."
        />
        <TeaserDiagnosticCard
          imageUrl="/images/surchauffe-urbaine/surchauffe-teaser-rex.jpg"
          title="Les retours d’expérience vous intéressent ?"
          description="Obtenez les contacts des collectivités qui ont effectué un diagnostic et des experts qui les
           ont accompagnées."
        />
      </div>
    </div>
  );
};
