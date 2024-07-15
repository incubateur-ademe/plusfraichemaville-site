// eslint-disable-next-line max-len
import { EstimationMateriauModalContainer } from "@/components/estimation/materiaux-modal/estimation-materiaux-modal-container";
import { AideFicheModal } from "@/components/financement/aide/aide-fiche-modal";
// eslint-disable-next-line max-len
import { PartageMemberModificationRoleModale } from "../partage/partage-member-modification-role-modale";
import { PartageOverviewDeleteOrQuitModale } from "../partage/partage-overview-delete-or-quit-modale";

export default function ModalProvider() {
  return (
    <>
      <EstimationMateriauModalContainer />
      <AideFicheModal />
      <PartageMemberModificationRoleModale />
      <PartageOverviewDeleteOrQuitModale />
    </>
  );
}
