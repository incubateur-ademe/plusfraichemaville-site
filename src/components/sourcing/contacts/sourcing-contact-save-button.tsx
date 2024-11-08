import { selectSavedOrUnsavedAssets } from "@/src/components/common/generic-save-fiche/assets";
import { GenericSaveButtonElement } from "@/src/components/common/generic-save-fiche/generic-save-button-element";
import { notifications } from "@/src/components/common/notifications";
import { Spinner } from "@/src/components/common/spinner";
import { RexContactId } from "@/src/lib/prisma/prismaCustomTypes";
import { useProjetsStore } from "@/src/stores/projets/provider";
import clsx from "clsx";
import { isEqual } from "lodash";
import { useDelayedLoading } from "@/src/hooks/use-delayed-loading";
import { updateRexContactInProjetAction } from "@/src/actions/projets/update-rex-contact-in-projet-action";
import { useEffect, useState } from "react";

type SourcingContactSaveButtonProps = {
  typeContact: "rex" | "in-progress";
  projetId: number;
  contactProjetId?: number;
  rexContactId?: RexContactId;
  className?: string;
};

export const SourcingContactSaveButton = ({
  typeContact,
  projetId,
  rexContactId,
  className,
}: SourcingContactSaveButtonProps) => {
  const [isSaved, setSaved] = useState(false);
  const { isLoading, startLoading, stopLoading } = useDelayedLoading(200);
  const addOrUpdateProjet = useProjetsStore((state) => state.addOrUpdateProjet);
  const getProjetById = useProjetsStore((state) => state.getProjetById);

  useEffect(() => {
    const projet = getProjetById(projetId);

    setSaved(
      rexContactId && projet
        ? (projet.sourcing_cms as RexContactId[]).some((savedRexContactId) => isEqual(savedRexContactId, rexContactId))
        : false,
    );
  }, [getProjetById, projetId, rexContactId, typeContact]);

  const assets = selectSavedOrUnsavedAssets(isSaved, "common");

  const updater = {
    delete: {
      action: () => updateRexContactInProjetAction(projetId, rexContactId!, "delete"),
    },
    add: {
      action: () => updateRexContactInProjetAction(projetId, rexContactId!, "add"),
    },
  };

  const update = async () => {
    startLoading();

    const result = isSaved ? await updater.delete.action() : await updater.add.action();

    if (result?.type === "success" && result.projet) {
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
