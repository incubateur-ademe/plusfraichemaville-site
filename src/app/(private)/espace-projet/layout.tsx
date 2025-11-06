"use client";
import { useUserStore } from "@/src/stores/user/provider";
import { hasAllRequiredFieldsSet } from "@/src/helpers/user";
import { useRouter } from "next/navigation";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { PartageOverviewDeleteOrQuitModale } from "@/src/components/espace-projet/utilisateurs-projet/partage-overview-delete-or-quit-modale";
import { ViewerModeModal } from "@/src/components/tableau-de-bord/viewer-mode-modal";
import { AvailableProjetsForCollectiviteModal } from "@/src/components/liste-projets/available-projets-for-collectivite-modal";
import { PropsWithChildren } from "react";

export default function Layout(props: PropsWithChildren) {
  const { children } = props;
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
