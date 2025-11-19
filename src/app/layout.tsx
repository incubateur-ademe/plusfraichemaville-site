import { PropsWithChildren } from "react";
import AppHeader from "@/src/components/layout/AppHeader";
import { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import MainLayoutProviders from "@/src/components/layout/MainLayoutProviders";
import { ProjetStoreServer } from "@/src/stores/projets/server";
import { UserStoreServer } from "@/src/stores/user/server";
import { headers } from "next/headers";
import { defaultMetadataDescription, defaultMetadataImage } from "@/src/helpers/metadata/helpers";
import { ConsentBannerAndConsentManagement } from "@/src/components/cookie/consentManagement";
import { DsfrHead, getHtmlAttributes } from "@/src/app/server-only-index";
import "./globals.css";
import MatomoScript from "@/src/components/matomo/matomo-script";
import { CommonSkipLinks } from "@/src/components/common/common-skip-links";
import AppFooter from "@/src/components/layout/AppFooter";

export const metadata: Metadata = {
  title: "Accueil | Plus fraîche ma ville",
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

export default async function RootLayout(props: PropsWithChildren) {
  const { children } = props;
  const lang = "fr";
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html {...getHtmlAttributes({ lang })}>
      <head>
        <MatomoScript />
        <DsfrHead
          doDisableFavicon={true}
          nonce={nonce}
          preloadFonts={["Marianne-Regular", "Marianne-Regular_Italic", "Marianne-Medium", "Marianne-Bold"]}
        />
      </head>
      <body>
        <MainLayoutProviders lang={lang}>
          <ConsentBannerAndConsentManagement />
          <ProjetStoreServer />
          <UserStoreServer />
          <CommonSkipLinks />
          <AppHeader />
          <Toaster position="bottom-left" />
          <main id="contenu" className="mb-40">
            {children}
          </main>
          <AppFooter />
        </MainLayoutProviders>
      </body>
    </html>
  );
}
