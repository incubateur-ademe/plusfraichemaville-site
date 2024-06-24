// eslint-disable-next-line max-len
import { EstimationMateriauModalContainer } from "@/components/estimation/materiaux-modal/estimation-materiaux-modal-container";
import { AideFicheModal } from "@/components/financement/aide/aide-fiche-modal";

export default function ModalProvider() {
  return (
    <>
      <EstimationMateriauModalContainer />
      <AideFicheModal />
    </>
  );
}
