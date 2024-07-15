// eslint-disable-next-line max-len
import { EstimationMateriauModalContainer } from "@/components/estimation/materiaux-modal/estimation-materiaux-modal-container";
import { AideFicheModal } from "@/components/financement/aide/aide-fiche-modal";
// eslint-disable-next-line max-len
import { PartageMemberModificationRoleModale } from "../partage/partage-member-modification-role-modale";

export default function ModalProvider() {
  return (
    <>
      <EstimationMateriauModalContainer />
      <AideFicheModal />
      <PartageMemberModificationRoleModale />
    </>
  );
}
