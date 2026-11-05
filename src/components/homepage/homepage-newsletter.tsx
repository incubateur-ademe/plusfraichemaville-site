import { PFMV_ROUTES } from "@/src/helpers/routes";
import Button from "@codegouvfr/react-dsfr/Button";

export const HomepageNewsletter = () => (
  <section className="fr-follow">
    <div className="fr-container flex flex-col items-center justify-between gap-6 md:flex-row">
      <div>
        <div className="fr-h4">Abonnez-vous à la lettre d’information « Plus fraîche ! »</div>
        <div>Les infos pratiques pour suivre et utiliser le service Plus fraîche ma ville au quotidien</div>
      </div>
      <div className="w-full md:w-fit">
        <Button className="w-full justify-center md:w-fit" linkProps={{ href: PFMV_ROUTES.NEWSLETTER }}>
          S’abonner
        </Button>
      </div>
    </div>
  </section>
);
