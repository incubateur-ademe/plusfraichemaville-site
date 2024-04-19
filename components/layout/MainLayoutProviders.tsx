"use client";
import { PropsWithChildren, Suspense } from "react";
import { DsfrProvider } from "@codegouvfr/react-dsfr/next-appdir/DsfrProvider";
import { SessionProvider } from "next-auth/react";
import { ProjetsStoreProvider } from "@/stores/projets/provider";
import { UserStoreProvider } from "@/stores/user/provider";
import MatomoPageView from "@/components/matomo/matomo-page-view";

export default function MainLayoutProviders({ children, lang }: PropsWithChildren<{ lang: string }>) {
  return (
    <SessionProvider>
      <UserStoreProvider>
        <ProjetsStoreProvider>
          <Suspense>
            <MatomoPageView />
          </Suspense>
          <DsfrProvider lang={lang}>{children}</DsfrProvider>
        </ProjetsStoreProvider>
      </UserStoreProvider>
    </SessionProvider>
  );
}
