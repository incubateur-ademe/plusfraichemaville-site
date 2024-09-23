import Link from "next/link";

export const HomepageNewsletter = () => (
  <div>
    <div className="fr-follow !py-12">
      <div className="fr-container">
        <div className="fr-grid-row">
          <div className="fr-col-12">
            <div className="fr-follow__newsletter">
              <div>
                <h2 className="fr-h5">Abonnez-vous à notre lettre d’information</h2>
                <p className="fr-text--sm">
                  {"Rejoignez la communauté Plus Fraîche ma ville, recevez des conseils d'experts lors " +
                    "de nos webinaires et parlez-nous de vos projets."}
                </p>
              </div>
              <div>
                <Link className="fr-btn rounded-3xl" href={`/contact`}>
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
