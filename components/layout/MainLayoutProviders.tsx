"use client";
import { PropsWithChildren } from "react";
import { DsfrProvider } from "@codegouvfr/react-dsfr/next-appdir/DsfrProvider";
import useTrackPageView from "@/hooks/useTrackPageView";

export default function MainLayoutProviders({ children, lang }: PropsWithChildren<{ lang: string }>) {
  useTrackPageView();

  return <DsfrProvider lang={lang}>{children}</DsfrProvider>;
}
