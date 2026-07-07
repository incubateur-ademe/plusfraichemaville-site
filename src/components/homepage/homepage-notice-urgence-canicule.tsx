import Notice from "@codegouvfr/react-dsfr/Notice";
import LinkWithoutPrefetch from "../common/link-without-prefetch";
import { PFMV_ROUTES } from "@/src/helpers/routes";

export const HomepageNoticeUrgenceCanicule = () => {
  return (
    <Notice
      classes={{ root: "[&_p]:mb-0" }}
      title={
        <>
          <span className="!mb-0 flex  flex-row align-text-top">
            <i className="ri-temp-hot-line mr-1"></i>
            Vague de chaleur :
          </span>
        </>
      }
      description={
        <>
          <span className="ml-6 inline-block">
            <LinkWithoutPrefetch
              className="fr-icon-arrow-right-line fr-link--icon-right"
              href={PFMV_ROUTES.SURCHAUFFE_URBAINE_REPONDRE_URGENCE}
            >
              Découvrez les premières actions à mener et comment intégrer le rafraîchissement urbain dans vos projets
              d'aménagement
            </LinkWithoutPrefetch>
          </span>
        </>
      }
      iconDisplayed={false}
      severity="warning"
    />
  );
};
