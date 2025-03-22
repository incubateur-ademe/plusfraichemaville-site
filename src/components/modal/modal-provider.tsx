// eslint-disable-next-line max-len
import { PartageOverviewDeleteOrQuitModale } from "../partage/partage-overview-delete-or-quit-modale";
import { AvailableProjetsForCollectiviteModal } from "../liste-projets/available-projets-for-collectivite-modal";
import { ViewerModeModal } from "../tableau-de-bord/viewer-mode-modal";
// eslint-disable-next-line max-len
import { AnnuaireRexContentSeeProjetModal } from "@/src/components/annuaire/side-panel/annuaire-rex-content-see-projet-modal";
import { FicheDiagnosticDescriptionModal } from "@/src/components/fiches-diagnostic/fiche-diagnostic-description-modal";

export default function ModalProvider() {
  return (
    <>
      <PartageOverviewDeleteOrQuitModale />
      <AvailableProjetsForCollectiviteModal />
      <AnnuaireRexContentSeeProjetModal />
      <FicheDiagnosticDescriptionModal />
      <ViewerModeModal />
    </>
  );
}
