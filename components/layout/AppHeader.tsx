import { Header } from "@codegouvfr/react-dsfr/Header";
import { headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";
import React from "react";
import NavigationMenu from "@/components/layout/NavigationMenu";

export default function AppHeader() {
  return (
    <Header
      brandTop={<>ADEME</>}
      homeLinkProps={{ href: "/", title: "Accueil - ADEME" }}
      quickAccessItems={[
        headerFooterDisplayItem,
        {
          iconId: "ri-mail-line",
          linkProps: { href: "mailto:plusfraichemaville@ademe.fr" },
          text: "Contactez nous",
        },
      ]}
      operatorLogo={{
        alt: "Plus fraîche ma ville",
        imgUrl: "/images/logo-pfmv.png",
        orientation: "horizontal",
      }}
      navigation={<NavigationMenu />}
    />
  );
}
