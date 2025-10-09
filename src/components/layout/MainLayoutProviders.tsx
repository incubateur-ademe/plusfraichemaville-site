"use client";
import { PropsWithChildren, Suspense } from "react";
import { SessionProvider } from "next-auth/react";
import { ProjetsStoreProvider } from "@/src/stores/projets/provider";
import { UserStoreProvider } from "@/src/stores/user/provider";
import MatomoPageView from "@/src/components/matomo/matomo-page-view";
import { ModalStoreProvider } from "@/src/stores/modal/provider";
import HubspotPageView from "../hubspot/path-page-view";
import { HusbpotScript } from "@/src/components/hubspot/script";
import { StartDsfrOnHydration } from "@codegouvfr/react-dsfr/next-app-router";
import { DsfrProvider } from "@/src/app/dsfr-provider";
import { GenericSaveModalUnauthenticated } from "@/src/components/common/generic-save-fiche/generic-save-modal-unauthenticated";
import { PartageOverviewDeleteOrQuitModale } from "@/src/components/partage/partage-overview-delete-or-quit-modale";
import { ViewerModeModal } from "@/src/components/tableau-de-bord/viewer-mode-modal";
import {
  AvailableProjetsForCollectiviteModal
} from "@/src/components/liste-projets/available-projets-for-collectivite-modal";

export default function MainLayoutProviders({ children, lang }: PropsWithChildren<{ lang: string }>) {
  return (
    <SessionProvider>
      <UserStoreProvider>
        <ProjetsStoreProvider>
          <ModalStoreProvider>
            <Suspense>
              <MatomoPageView />
              <HubspotPageView />
            </Suspense>
            <DsfrProvider lang={lang}>
              <>
                <StartDsfrOnHydration />
                {children}
                <GenericSaveModalUnauthenticated />
                <PartageOverviewDeleteOrQuitModale />
                <ViewerModeModal />
                <AvailableProjetsForCollectiviteModal />
              </>
            </DsfrProvider>
          </ModalStoreProvider>
        </ProjetsStoreProvider>
      </UserStoreProvider>
      <HusbpotScript />
    </SessionProvider>
  );
}
