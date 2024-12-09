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
import { updateUserContactInProjetAction } from "@/src/actions/projets/update-user-contact-in-projet-action";
import { trackEvent } from "@/src/helpers/matomo/track-matomo";
import { SOURCING_SAVING_CONTACT } from "@/src/helpers/matomo/matomo-tags";
import { SOURCING_DELETING_CONTACT } from "@/src/helpers/matomo/matomo-tags";

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
        (projet.sourcing_rex as RexContactId[] | null)?.some((savedRexContactId) =>
          isEqual(savedRexContactId, {
            rexId: contact.id.rexId,
            contactId: contact.id.contactId,
          }),
        ) || false,
      );
    } else if (contact.type === "in-progress") {
      setSaved(
        projet?.sourcing_user_projets.some(
          (savedUserProjet) => savedUserProjet.sourced_user_projet.id === contact.userProjetId,
        ) || false,
      );
    }
  }, [contact, getProjetById, projetId]);

  const assets = selectSavedOrUnsavedAssets(isSaved, "contact");

  const updater = {
    delete: {
      action: () =>
        contact.type === "rex"
          ? updateRexContactInProjetAction(projetId, contact.id, "delete")
          : updateUserContactInProjetAction(projetId, contact.userProjetId, "delete"),
    },
    add: {
      action: () =>
        contact.type === "rex"
          ? updateRexContactInProjetAction(projetId, contact.id, "add")
          : updateUserContactInProjetAction(projetId, contact.userProjetId, "add"),
    },
  };

  const update = async () => {
    startLoading();

    const result = isSaved ? await updater.delete.action() : await updater.add.action();

    isSaved ? trackEvent(SOURCING_DELETING_CONTACT) : trackEvent(SOURCING_SAVING_CONTACT);

    if (result.type === "success" && result.projet) {
      addOrUpdateProjet(result.projet);
      setSaved(!isSaved);
    } else {
      notifications(result.type, result.message);
    }
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
