"use client";
import { PropsWithChildren } from "react";
import { DsfrProvider } from "@codegouvfr/react-dsfr/next-appdir/DsfrProvider";
import useTrackPageView from "@/hooks/useTrackPageView";
import { SessionProvider } from "next-auth/react";
import { ProjetsStoreProvider } from "@/stores/projets/provider";
import { UserStoreProvider } from "@/stores/user/provider";

export default function MainLayoutProviders({ children, lang }: PropsWithChildren<{ lang: string }>) {
  useTrackPageView();

  return (
    <SessionProvider>
      <UserStoreProvider>
        <ProjetsStoreProvider>
          <DsfrProvider lang={lang}>{children}</DsfrProvider>
        </ProjetsStoreProvider>
      </UserStoreProvider>
    </SessionProvider>
  );
}
