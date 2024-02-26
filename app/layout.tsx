import { getHtmlAttributes } from "@codegouvfr/react-dsfr/next-appdir/getHtmlAttributes";
import { StartDsfr } from "./StartDsfr";
import { defaultColorScheme } from "./defaultColorScheme";
import Link from "next/link";
import React, { ReactElement } from "react";
import AppHeader from "@/components/layout/AppHeader";
import { Metadata } from "next";
import { DsfrHead } from "@codegouvfr/react-dsfr/next-appdir/DsfrHead";
import localFont from "next/font/local";
import "./globals.css";
import "@codegouvfr/react-dsfr/dsfr/utility/icons/icons.css";
import { Toaster } from "react-hot-toast";
import MatomoScript from "@/components/matomo/MatomoScript";
import MainLayoutProviders from "@/components/layout/MainLayoutProviders";
import { UserClient } from "@/components/user";
import SessionProvider from "@/components/authentication/SessionProvider";

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
  description: "Le service numérique dédié aux agents et aux élus qui rafraîchissent durablement leur collectivité.",
  manifest: "/favicon/manifest.webmanifest",
  metadataBase: new URL("https://plusfraichemaville.fr"),
  openGraph: {
    title: "Plus fraîche ma ville - N'attendez pas la prochaine vague",
    type: "website",
    description: "Le service numérique dédié aux agents et aux élus qui rafraîchissent durablement leur collectivité.",
    images: "/favicon/apple-touch-icon.png",
  },
};

export default async function RootLayout({ children }: { children: ReactElement | null }) {
  const lang = "fr";

  return (
    <html {...getHtmlAttributes({ defaultColorScheme, lang })}>
      <head>
        <StartDsfr />
        <DsfrHead Link={Link} doDisableFavicon={true} />
        <MatomoScript />
      </head>
      <body>
        <MainLayoutProviders lang={lang}>
          <SessionProvider>
            <UserClient />
            <AppHeader />
            <Toaster position="bottom-left" />
            <div className={`${xtra_bold.variable}`}>{children}</div>
          </SessionProvider>
        </MainLayoutProviders>
      </body>
    </html>
  );
}
