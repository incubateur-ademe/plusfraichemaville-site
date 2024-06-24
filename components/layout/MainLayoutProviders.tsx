"use client";
import { PropsWithChildren, Suspense } from "react";
import { DsfrProvider } from "@codegouvfr/react-dsfr/next-appdir/DsfrProvider";
import { SessionProvider } from "next-auth/react";
import { ProjetsStoreProvider } from "@/stores/projets/provider";
import { UserStoreProvider } from "@/stores/user/provider";
import MatomoPageView from "@/components/matomo/matomo-page-view";
import ModalProvider from "@/components/modal/modal-provider";
import { ModalStoreProvider } from "@/stores/modal/provider";

export default function MainLayoutProviders({ children, lang }: PropsWithChildren<{ lang: string }>) {
  return (
    <SessionProvider>
      <UserStoreProvider>
        <ProjetsStoreProvider>
          <ModalStoreProvider>
            <Suspense>
              <MatomoPageView />
            </Suspense>
            <DsfrProvider lang={lang}>
              <>
                {children}
                <ModalProvider />
              </>
            </DsfrProvider>
          </ModalStoreProvider>
        </ProjetsStoreProvider>
      </UserStoreProvider>
    </SessionProvider>
  );
}
