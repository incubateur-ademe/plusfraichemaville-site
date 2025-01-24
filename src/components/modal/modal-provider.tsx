// eslint-disable-next-line max-len
import { EstimationMateriauModalContainer } from "@/src/components/estimation/materiaux-modal/estimation-materiaux-modal-container";
import { AideFicheModal } from "@/src/components/financement/aide/aide-fiche-modal";
import { PartageOverviewDeleteOrQuitModale } from "../partage/partage-overview-delete-or-quit-modale";
import { AvailableProjetsForCollectiviteModal } from "../liste-projets/available-projets-for-collectivite-modal";
import { ViewerModeModal } from "../tableau-de-bord/viewer-mode-modal";
// eslint-disable-next-line max-len
import { AnnuaireRexContentSeeProjetModal } from "@/src/components/annuaire/side-panel/annuaire-rex-content-see-projet-modal";
import { PartageMemberModificationRoleModale } from "../partage/partage-member-modification-role-modale";

export default function ModalProvider() {
  return (
    <>
      <PartageMemberModificationRoleModale />
      <EstimationMateriauModalContainer />
      <AideFicheModal />
      <PartageOverviewDeleteOrQuitModale />
      <AvailableProjetsForCollectiviteModal />
      <AnnuaireRexContentSeeProjetModal />
      <ViewerModeModal />
    </>
  );
}
