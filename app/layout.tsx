import { DsfrHead } from "@codegouvfr/react-dsfr/next-appdir/DsfrHead";
import { DsfrProvider } from "@codegouvfr/react-dsfr/next-appdir/DsfrProvider";
import { getHtmlAttributes } from "@codegouvfr/react-dsfr/next-appdir/getHtmlAttributes";
import { StartDsfr } from "./StartDsfr";
import { defaultColorScheme } from "./defaultColorScheme";
import Link from "next/link";
import React, { ReactElement } from "react";
import "./globals.css";
import AppHeader from "@/components/layout/AppHeader";
import AppFooter from "@/components/layout/AppFooter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plus fraîche ma ville",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
    other: {
      rel: "icon",
      url: "/favicon/favicon.svg",
      type: "image/svg+xml",
    },
  },
  description: "Plus fraîche ma ville",
  manifest: "/favicon/manifest.webmanifest",
};

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
          <AppHeader />
          <div className="fr-container mt-8 mb-12">{children}</div>
          <AppFooter />
        </DsfrProvider>
      </body>
    </html>
  );
}
