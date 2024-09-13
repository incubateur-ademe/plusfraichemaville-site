"use client";
import { PropsWithChildren, Suspense } from "react";
import { DsfrProvider } from "@codegouvfr/react-dsfr/next-appdir/DsfrProvider";
import { SessionProvider } from "next-auth/react";
import { ProjetsStoreProvider } from "@/src/stores/projets/provider";
import { UserStoreProvider } from "@/src/stores/user/provider";
import MatomoPageView from "@/src/components/matomo/matomo-page-view";
import ModalProvider from "@/src/components/modal/modal-provider";
import { ModalStoreProvider } from "@/src/stores/modal/provider";

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
