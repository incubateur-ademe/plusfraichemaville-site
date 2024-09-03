import "./globals.css";
import { getHtmlAttributes } from "@codegouvfr/react-dsfr/next-appdir/getHtmlAttributes";
import { StartDsfr } from "./StartDsfr";
import { defaultColorScheme } from "./defaultColorScheme";
import Link from "next/link";
import React, { ReactElement } from "react";
import AppHeader from "@/components/layout/AppHeader";
import { Metadata } from "next";
import { DsfrHead } from "@codegouvfr/react-dsfr/next-appdir/DsfrHead";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import MatomoScript from "@/components/matomo/MatomoScript";
import MainLayoutProviders from "@/components/layout/MainLayoutProviders";
import { ProjetStoreServer } from "@/stores/projets/server";
import { UserStoreServer } from "@/stores/user/server";
// eslint-disable-next-line max-len
import { GenericFichesSaverFromLocalStorage } from "@/components/common/generic-save-fiche/generic-saver-from-local-storage";
import { headers } from "next/headers";
import { defaultMetadataDescription, defaultMetadataImage } from "@/helpers/metadata/helpers";
import { ConsentBannerAndConsentManagement } from "@/components/cookie/consentManagement";
import { Agent } from "@/components/agent-conversationnel/agent";

const xtra_bold = localFont({
  src: "../public/fonts/Marianne-ExtraBold.woff2",
  variable: "--font-xtra-bold",
});

export const metadata: Metadata = {
  title: "Plus fraîche ma ville - N'attendez pas la prochaine vague",
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
  description: defaultMetadataDescription,
  manifest: "/favicon/manifest.webmanifest",
  metadataBase: new URL("https://plusfraichemaville.fr"),
  openGraph: {
    title: "Plus fraîche ma ville - N'attendez pas la prochaine vague",
    type: "website",
    description: defaultMetadataDescription,
    images: defaultMetadataImage,
  },
};

export default async function RootLayout({ children }: { children: ReactElement | null }) {
  const lang = "fr";
  const nonce = headers().get("x-nonce") ?? undefined;

  return (
    <html {...getHtmlAttributes({ defaultColorScheme, lang })}>
      <head>
        <StartDsfr />
        <DsfrHead Link={Link} doDisableFavicon={true} nonce={nonce} />
        <MatomoScript />
      </head>
      <body>
        <MainLayoutProviders lang={lang}>
          <ConsentBannerAndConsentManagement />
          <ProjetStoreServer />
          <UserStoreServer />
          <GenericFichesSaverFromLocalStorage />
          <AppHeader />
          <Toaster position="bottom-left" />
          <div className={`${xtra_bold.variable}`}>{children}</div>
          <Agent />
        </MainLayoutProviders>
      </body>
    </html>
  );
}
