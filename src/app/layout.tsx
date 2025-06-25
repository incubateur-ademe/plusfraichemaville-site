import "./globals.css";
import { ReactElement } from "react";
import AppHeader from "@/src/components/layout/AppHeader";
import { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import MainLayoutProviders from "@/src/components/layout/MainLayoutProviders";
import { ProjetStoreServer } from "@/src/stores/projets/server";
import { UserStoreServer } from "@/src/stores/user/server";
import { headers } from "next/headers";
import { defaultMetadataDescription, defaultMetadataImage } from "@/src/helpers/metadata/helpers";
import { ConsentBannerAndConsentManagement } from "@/src/components/cookie/consentManagement";
import { Agent } from "@/src/components/agent-conversationnel/agent";
import { DsfrHead, getHtmlAttributes } from "@/src/app/server-only-index";
import MatomoScript from "@/src/components/matomo/matomo-script";

const xtra_bold = localFont({
  src: "../../public/fonts/Marianne-ExtraBold.woff2",
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
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html {...getHtmlAttributes({ lang })}>
      <head>
        <MatomoScript />
        <DsfrHead
          doDisableFavicon={true}
          nonce={nonce}
          preloadFonts={[
            "Marianne-Regular",
            "Marianne-Regular_Italic",
            "Marianne-Medium",
            "Marianne-Medium_Italic",
            "Marianne-Bold",
            "Marianne-Bold_Italic",
          ]}
        />
      </head>
      <body>
        <MainLayoutProviders lang={lang}>
          <ConsentBannerAndConsentManagement />
          <ProjetStoreServer />
          <UserStoreServer />
          <AppHeader />
          <Toaster position="bottom-left" />
          <div className={`${xtra_bold.variable}`}>
            <main>{children}</main>
          </div>
          <Agent />
        </MainLayoutProviders>
      </body>
    </html>
  );
}
