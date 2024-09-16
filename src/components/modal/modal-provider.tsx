// eslint-disable-next-line max-len
import { EstimationMateriauModalContainer } from "@/src/components/estimation/materiaux-modal/estimation-materiaux-modal-container";
import { AideFicheModal } from "@/src/components/financement/aide/aide-fiche-modal";
// eslint-disable-next-line max-len
import { PartageMemberModificationRoleModale } from "../partage/partage-member-modification-role-modale";
import { PartageOverviewDeleteOrQuitModale } from "../partage/partage-overview-delete-or-quit-modale";
import { AvailableProjetsForCollectiviteModal } from "../liste-projets/available-projets-for-collectivite-modal";
import { ViewerModeModal } from "../tableau-de-bord/viewer-mode-modal";

export default function ModalProvider() {
  return (
    <>
      <EstimationMateriauModalContainer />
      <AideFicheModal />
      <PartageMemberModificationRoleModale />
      <PartageOverviewDeleteOrQuitModale />
      <AvailableProjetsForCollectiviteModal />
      <ViewerModeModal />
    </>
  );
}
