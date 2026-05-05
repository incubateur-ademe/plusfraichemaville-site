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
import { ModalSaveFinancementAuthenticatedOutsideProjet } from "@/src/components/common/generic-save-fiche/generic-save-financement-modal-authenticated-outside-projet";
import Image from "next/image";
import apercuModuleAides from "../../../public/images/espace-projet-incentive/apercu-module-financement.png";
import clsx from "clsx";

export default function FicheSolutionFinancementsIncentive({ ficheId, nbAides }: { ficheId: number; nbAides: number }) {
  const { status } = useSession();
  const currentProjetId = useProjetsStore((state) => state.currentProjetId);
  const addOrUpdateProjet = useProjetsStore((state) => state.addOrUpdateProjet);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const modal = createModal({
    id: `fs-financement-modal-${ficheId}`,
    isOpenedByDefault: false,
  });

  const handleClick = async () => {
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
        router.push(PFMV_ROUTES.ESPACE_PROJET_FINANCEMENT(currentProjetId));
      } else {
        notifications(update.type, update.message);
      }
      setIsSubmitting(false);
    } else {
      modal.open();
    }
  };

  const buttonLabel = "Découvrir les aides pour mon projet";

  return (
    <>
      {status === "authenticated" ? (
        <p>Découvrez les aides financières mobilisables pour votre projet !</p>
      ) : (
        <>
          <p>
            {nbAides} {nbAides > 1 ? "aides financières correspondent" : "aide financière correspond"} à cette solution
            !
          </p>
          <p className="font-bold">Créez votre projet pour découvrir celles qui sont mobilisables dans votre cas.</p>
        </>
      )}
      <div className="flex justify-center">
        <Button className="mb-8 rounded-3xl" onClick={handleClick} disabled={isSubmitting}>
          {buttonLabel}
        </Button>
      </div>

      <div
        className={clsx(
          "mt-6 flex flex-col items-center gap-8 rounded-2xl bg-dsfr-background-alt-blue-france",
          "p-6 text-dsfr-text-title-grey md:flex-row md:p-10",
        )}
      >
        <div className="hidden flex-1 md:block">
          <Image src={apercuModuleAides} alt="Aperçu du module aides" className="w-full rounded-xl object-contain" />
        </div>
        <div className="flex-1">
          <p className="mb-4 text-lg">
            Le module d{"'"}
            <strong>aides financières et en ingénierie</strong> est disponible dans l{"'"}espace projet.
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              Découvrez la liste des <strong>aides disponibles</strong> pour votre projet et ses solutions.
            </li>
            <li>
              Utilisez les <strong>filtres</strong> pour choisir les plus pertinentes.
            </li>
            <li>
              <strong>Sauvegardez</strong>-les pour les retrouver facilement et être sûr de ne pas rater d{"'"}échéance.
            </li>
          </ul>
        </div>
      </div>
      <ModalSaveFinancementAuthenticatedOutsideProjet modal={modal} type={TypeFiche.solution} id={ficheId} />
    </>
  );
}
