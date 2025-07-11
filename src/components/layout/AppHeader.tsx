import NavigationMenu from "@/src/components/layout/NavigationMenu";
import Image from "next/image";

import { AuthButtons } from "../authentication/auth-buttons";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

export default function AppHeader() {
  return (
    <>
      <header role="banner" className="fr-header">
        <div className="fr-header__body">
          <div className="fr-container">
            <div className="fr-header__body-row !justify-between">
              <div className="fr-header__brand fr-enlarge-link">
                <div className="fr-header__brand-top">
                  <div className="fr-header__logo">
                    <LinkWithoutPrefetch href="/" title="Accueil - ADEME">
                      <p className="fr-logo">
                        République
                        <br />
                        Française
                      </p>
                    </LinkWithoutPrefetch>
                  </div>
                  <div className="fr-header__operator">
                    <Image
                      className=""
                      width={261}
                      height={70}
                      src={"/images/logo-ademe-pfmv.svg"}
                      alt={"ADEME - Plus fraîche ma ville"}
                    />
                  </div>
                  <div className="fr-header__navbar">
                    <button
                      className="fr-btn--menu fr-btn"
                      data-fr-opened="false"
                      aria-controls="modal-491"
                      aria-haspopup="menu"
                      id="button-492"
                      title="Menu"
                    >
                      Menu
                    </button>
                  </div>
                </div>
              </div>
              <AuthButtons />
            </div>
          </div>
        </div>
        <div className="fr-header__menu fr-modal" id="modal-491" aria-labelledby="button-492">
          <div className="fr-container">
            <button className="fr-btn--close fr-btn" aria-controls="modal-491" title="Fermer">
              Fermer
            </button>
            <NavigationMenu />
          </div>
        </div>
      </header>
    </>
  );
}
