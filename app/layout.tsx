import { DsfrHead } from "@codegouvfr/react-dsfr/next-appdir/DsfrHead";
import { DsfrProvider } from "@codegouvfr/react-dsfr/next-appdir/DsfrProvider";
import { getHtmlAttributes } from "@codegouvfr/react-dsfr/next-appdir/getHtmlAttributes";
import { StartDsfr } from "./StartDsfr";
import { defaultColorScheme } from "./defaultColorScheme";
import Link from "next/link";
import React, { ReactElement } from "react";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";
import Footer from "@codegouvfr/react-dsfr/Footer";

export default function RootLayout({ children }: { children: ReactElement | null }) {
  const lang = "fr";
  return (
    <html {...getHtmlAttributes({ defaultColorScheme, lang })}>
      <head>
        <title>Plus fraîche ma ville</title>
        <StartDsfr />
        <DsfrHead Link={Link} />
      </head>
      <body>
        <DsfrProvider lang={lang}>
          <Header
            brandTop={<>ADEME</>}
            serviceTitle="Plus fraîche ma ville / ADEME"
            homeLinkProps={{ href: "/", title: "Accueil - ADEME" }}
            quickAccessItems={[
              headerFooterDisplayItem,
              {
                iconId: "ri-mail-line",
                linkProps: { href: "mailto:plusfraichemaville@ademe.fr" },
                text: "Contactez nous",
              },
            ]}
          />
          <div style={{ flex: 1 }}>
            <div className="fr-container">{children}</div>
            <Footer accessibility={"fully compliant"} />
          </div>
        </DsfrProvider>
      </body>
    </html>
  );
}
