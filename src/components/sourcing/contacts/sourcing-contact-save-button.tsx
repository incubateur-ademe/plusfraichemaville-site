import { selectSavedOrUnsavedAssets } from "@/src/components/common/generic-save-fiche/assets";
import { GenericSaveButtonElement } from "@/src/components/common/generic-save-fiche/generic-save-button-element";
import { notifications } from "@/src/components/common/notifications";
import { Spinner } from "@/src/components/common/spinner";
import { useProjetsStore } from "@/src/stores/projets/provider";
import clsx from "clsx";
import { isEqual } from "lodash";
import { useDelayedLoading } from "@/src/hooks/use-delayed-loading";
import { updateRexContactInProjetAction } from "@/src/actions/projets/update-rex-contact-in-projet-action";
import { useEffect, useState } from "react";
import { RexContactId, SourcingContact } from "@/src/components/sourcing/types";

type SourcingContactSaveButtonProps = {
  projetId: number;
  contact: SourcingContact;
  className?: string;
};

export const SourcingContactSaveButton = ({ projetId, contact, className }: SourcingContactSaveButtonProps) => {
  const [isSaved, setSaved] = useState(false);
  const { isLoading, startLoading, stopLoading } = useDelayedLoading(200);
  const addOrUpdateProjet = useProjetsStore((state) => state.addOrUpdateProjet);
  const getProjetById = useProjetsStore((state) => state.getProjetById);

  useEffect(() => {
    const projet = getProjetById(projetId);

    if (contact.type === "rex" && projet) {
      setSaved(
        (projet.sourcing_cms as RexContactId[]).some((savedRexContactId) =>
          isEqual(savedRexContactId, {
            rexId: contact.id.rexId,
            contactId: contact.id.contactId,
          }),
        ),
      );
    } else {
      setSaved(false);
    }
  }, [contact, getProjetById, projetId]);

  const assets = selectSavedOrUnsavedAssets(isSaved, "common");

  const updater = {
    delete: {
      action: () => contact.type === "rex" && updateRexContactInProjetAction(projetId, contact.id, "delete"),
    },
    add: {
      action: () => contact.type === "rex" && updateRexContactInProjetAction(projetId, contact.id, "add"),
    },
  };

  const update = async () => {
    startLoading();

    const result = isSaved ? await updater.delete.action() : await updater.add.action();

    // if (result?.type === "success" && result.projet) {
    //   addOrUpdateProjet(result.projet);
    //   setSaved(!isSaved);
    // } else {
    //   notifications(result.type, result.message);
    // }
    stopLoading();
  };

  return (
    <div className={clsx("z-10", className)}>
      {isLoading ? (
        <div className="z-10 rounded-full  bg-pfmv-navy">
          <Spinner />
        </div>
      ) : (
        <GenericSaveButtonElement withoutModal className="" update={update} assets={assets} id={1} />
      )}
    </div>
  );
};
