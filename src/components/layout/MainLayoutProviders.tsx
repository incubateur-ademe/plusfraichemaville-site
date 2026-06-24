"use client";
import { PropsWithChildren, Suspense } from "react";
import { SessionProvider } from "next-auth/react";
import { ProjetsStoreProvider } from "@/src/stores/projets/provider";
import { UserStoreProvider } from "@/src/stores/user/provider";
import MatomoPageView from "@/src/components/matomo/matomo-page-view";
import { ModalStoreProvider } from "@/src/stores/modal/provider";
import { StartDsfrOnHydration } from "@codegouvfr/react-dsfr/next-app-router";
import { DsfrProvider } from "@/src/app/dsfr-provider";
import { GenericSaveModalUnauthenticated } from "@/src/components/common/generic-save-fiche/generic-save-modal-unauthenticated";
import { UserBrowsingTracker } from "@/src/components/user/UserBrowsingTracker";
import { PostHogProvider } from "@/src/components/posthog/posthog-provider";
import { SuspendedPostHogPageView } from "@/src/components/posthog/posthog-page-view";
import { SuspendedPostHogTagManager } from "@/src/components/posthog/posthog-tag-manager";

export default function MainLayoutProviders({ children, lang }: PropsWithChildren<{ lang: string }>) {
  return (
    <PostHogProvider>
      <SessionProvider>
        <UserStoreProvider>
          <ProjetsStoreProvider>
            <ModalStoreProvider>
              <Suspense>
                <MatomoPageView />
                <UserBrowsingTracker />
                <SuspendedPostHogPageView />
                <SuspendedPostHogTagManager />
              </Suspense>
              <DsfrProvider lang={lang}>
                <>
                  <StartDsfrOnHydration />
                  {children}
                  <GenericSaveModalUnauthenticated />
                </>
              </DsfrProvider>
            </ModalStoreProvider>
          </ProjetsStoreProvider>
        </UserStoreProvider>
      </SessionProvider>
    </PostHogProvider>
  );
}
