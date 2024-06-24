"use client";

import Button from "@codegouvfr/react-dsfr/Button";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { AideFiche } from "@/components/financement/aide/aide-fiche";
import { useModalStore } from "@/stores/modal/provider";
import { resolveAidType } from "@/components/financement/helpers";

const modal = createModal({
  id: "detailed-aide-modal",
  isOpenedByDefault: false,
});

export const AideFicheModal = () => {
  const currentDetailedAide = useModalStore((state) => state.currentDetailedAide);
  return (
    <>
      <modal.Component title="" size="large" className="aide-modal relative">e
        {currentDetailedAide ? (
          <AideFiche aide={currentDetailedAide} type={resolveAidType(currentDetailedAide.aid_types_full)} />
        ) : (
          <div>Chargement en cours...</div>
        )}
      </modal.Component>
    </>
  );
};
