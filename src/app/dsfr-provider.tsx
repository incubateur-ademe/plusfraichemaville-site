"use client";
import { DsfrProviderBase, type DsfrProviderProps, StartDsfrOnHydration } from "@codegouvfr/react-dsfr/next-app-router";
import { defaultColorScheme } from "./defaultColorScheme";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

declare module "@codegouvfr/react-dsfr/next-app-router" {
  // eslint-disable-next-line no-unused-vars
  interface RegisterLink {
    Link: typeof LinkWithoutPrefetch;
  }
}

export function DsfrProvider(props: DsfrProviderProps) {
  return <DsfrProviderBase defaultColorScheme={defaultColorScheme} Link={LinkWithoutPrefetch} {...props} />;
}

export { StartDsfrOnHydration };
