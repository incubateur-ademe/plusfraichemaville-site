import Link from "next/link";
import { PFMV_ROUTES } from "@/src/helpers/routes";

export const HomepageNewsletter = () => (
  <div>
    <div className="fr-follow !py-12">
      <div className="fr-container">
        <div className="fr-grid-row">
          <div className="fr-col-12 fr-col-md-6 !pr-[6%]">
            <div className="fr-follow__newsletter">
              <h2 className="fr-h5">Abonnez-vous à notre lettre d’information</h2>
              <p className="mb-6 mt-2">
                {"Rejoignez la communauté Plus Fraîche ma ville, recevez des conseils d'experts lors " +
                  "de nos webinaires et parlez-nous de vos projets."}
              </p>
              <Link className="fr-btn rounded-3xl" href={PFMV_ROUTES.NEWSLETTER}>
                {"S'abonner"}
              </Link>
            </div>
          </div>
          <div className="fr-col-12 fr-col-md-6">
            <div className="fr-follow__newsletter">
              <h2 className="fr-h5">Nous contacter</h2>
              <p className="mb-6 mt-2">
                {"Pour toutes question, n'hésitez pas à nous contacter."}
                <br />
                {"Nous sommes là pour vous fournir les informations utiles."}
              </p>
              <div>
                <Link className="fr-btn rounded-3xl" href={PFMV_ROUTES.CONTACT}>
                  {"Nous contacter"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
