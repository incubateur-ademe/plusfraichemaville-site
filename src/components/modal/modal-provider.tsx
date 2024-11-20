// eslint-disable-next-line max-len
import { EstimationMateriauModalContainer } from "@/src/components/estimation/materiaux-modal/estimation-materiaux-modal-container";
import { AideFicheModal } from "@/src/components/financement/aide/aide-fiche-modal";
import { PartageOverviewDeleteOrQuitModale } from "../partage/partage-overview-delete-or-quit-modale";
import { AvailableProjetsForCollectiviteModal } from "../liste-projets/available-projets-for-collectivite-modal";
import { ViewerModeModal } from "../tableau-de-bord/viewer-mode-modal";
// eslint-disable-next-line max-len
import { SourcingRexContentSeeProjetModal } from "@/src/components/sourcing/side-panel/sourcing-rex-content-see-projet-modal";

export default function ModalProvider() {
  return (
    <>
      <EstimationMateriauModalContainer />
      <AideFicheModal />
      <PartageOverviewDeleteOrQuitModale />
      <AvailableProjetsForCollectiviteModal />
      <SourcingRexContentSeeProjetModal />
      <ViewerModeModal />
    </>
  );
}
