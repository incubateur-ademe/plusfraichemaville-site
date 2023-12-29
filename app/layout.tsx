import { DsfrProvider } from "@codegouvfr/react-dsfr/next-appdir/DsfrProvider";
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
import { Toaster } from "react-hot-toast";

const xtra_bold = localFont({
  src: "../public/fonts/Marianne-ExtraBold.woff2",
  variable: "--font-xtra-bold",
});

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
        <DsfrHead Link={Link} doDisableFavicon={true} />
      </head>
      <body>
        <DsfrProvider lang={lang}>
          <AppHeader />
          <Toaster position="bottom-left" />
          <div className={`${xtra_bold.variable}`}>{children}</div>
        </DsfrProvider>
      </body>
    </html>
  );
}
