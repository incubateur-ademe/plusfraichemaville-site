import { Header } from "@codegouvfr/react-dsfr/Header";
import React from "react";
import NavigationMenu from "@/components/layout/NavigationMenu";

export default function AppHeader() {
  return (
    <Header
      brandTop={<>République <br/> française</>}
      homeLinkProps={{ href: "/", title: "Accueil - ADEME" }}
      operatorLogo={{
        alt: "Plus fraîche ma ville",
        imgUrl: "/images/logo-pfmv.png",
        orientation: "horizontal",
      }}
      navigation={<NavigationMenu />}
    />
  );
}
