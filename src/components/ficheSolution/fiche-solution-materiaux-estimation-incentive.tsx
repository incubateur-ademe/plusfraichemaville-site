"use client";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import Button from "@codegouvfr/react-dsfr/Button";
import { useSession } from "next-auth/react";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { updateFichesProjetAction } from "@/src/actions/projets/update-fiches-projet-action";
import { notifications } from "@/src/components/common/notifications";
import { TypeFiche, TypeUpdate } from "@/src/helpers/common";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { ModalSaveEstimationAuthenticatedOutsideProjet } from "@/src/components/common/generic-save-fiche/generic-save-estimation-modal-authenticated-outside-projet";

export default function FicheSolutionMateriauxEstimationIncentive({ ficheId }: { ficheId: number }) {
  const { status } = useSession();
  const currentProjetId = useProjetsStore((state) => state.currentProjetId);
  const addOrUpdateProjet = useProjetsStore((state) => state.addOrUpdateProjet);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const modal = createModal({
    id: `fs-estimation-modal-${ficheId}`,
    isOpenedByDefault: false,
  });

  const handleEstimerClick = async () => {
    if (status === "unauthenticated") {
      router.push(PFMV_ROUTES.CONNEXION);
      return;
    }

    if (currentProjetId) {
      setIsSubmitting(true);
      const update = await updateFichesProjetAction({
        projetId: currentProjetId,
        ficheId: +ficheId,
        typeFiche: TypeFiche.solution,
        typeUpdate: TypeUpdate.add,
      });
      if (update.projet) {
        addOrUpdateProjet(update.projet);
      }
      if (update.type === "success") {
        router.push(PFMV_ROUTES.ESPACE_PROJET_LISTE_ESTIMATION(currentProjetId));
      } else {
        notifications(update.type, update.message);
      }
      setIsSubmitting(false);
    } else {
      modal.open();
    }
  };

  return (
    <>
      <p>Estimez le coût des solutions choisies pour votre projet directement dans votre espace :</p>
      <div className="flex justify-center">
        <Button className="mb-8 rounded-3xl" onClick={handleEstimerClick} disabled={isSubmitting}>
          {"Estimer le budget pour mon projet"}
        </Button>
      </div>
      <ModalSaveEstimationAuthenticatedOutsideProjet modal={modal} type={TypeFiche.solution} id={ficheId} />
    </>
  );
}
