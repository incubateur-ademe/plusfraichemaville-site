import React from "react";
import Footer from "@codegouvfr/react-dsfr/Footer";

export default function AppFooter() {
  return (
    <Footer
      accessibility={"fully compliant"}
      operatorLogo={{
        alt: "ADEME",
        imgUrl: "/images/logo-ademe.png",
        orientation: "vertical",
      }}
      contentDescription={
        "Plus fraîche ma ville est une startup d'État portée par l’Agence pour la Transition Écologique (ADEME). " +
        "Notre mission : aider les collectivités dans le choix de solutions de rafraîchissement " +
        "urbain pérennes et durables. "
      }
      partnersLogos={{
        main: {
          alt: "Association des maires de France",
          href: "#",
          imgUrl: "/images/logo-amf.jpg",
        },
      }}
    />
  );
}
