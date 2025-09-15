"use client";
import { ReactElement } from "react";
import { useUserStore } from "@/src/stores/user/provider";
import { hasAllRequiredFieldsSet } from "@/src/helpers/user";
import { useRouter } from "next/navigation";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { PartageOverviewDeleteOrQuitModale } from "@/src/components/partage/partage-overview-delete-or-quit-modale";
import { ViewerModeModal } from "@/src/components/tableau-de-bord/viewer-mode-modal";
import { AvailableProjetsForCollectiviteModal } from "@/src/components/liste-projets/available-projets-for-collectivite-modal";

export default function Layout({ children }: { children: ReactElement | null }) {
  const user = useUserStore((state) => state.userInfos);
  const router = useRouter();
  if (user && !hasAllRequiredFieldsSet(user)) {
    return router.push(PFMV_ROUTES.MON_PROFIL);
  }
  return (
    <>
      {children}
      <PartageOverviewDeleteOrQuitModale />
      <ViewerModeModal />
      <AvailableProjetsForCollectiviteModal />
    </>
  );
}
