import { PFMV_ROUTES } from "@/helpers/routes";
import Button from "@codegouvfr/react-dsfr/Button";
import { GenericSaveModalCommonProps } from "./generic-save-modal";
import { setBadgeOff, NotificationElements } from "@/helpers/notification-badge";

export const GenericSaveModalUnauthenticated = ({ modal, type }: GenericSaveModalCommonProps) => {
  const isSolution = type === "solution";
  const mention = isSolution ? "Solution" : "Méthode diagnostic";
  const mentions = isSolution ? "solutions" : "méthodes diagnostic";
  return (
    <modal.Component title="" size="large">
      <div>
        <h1 id="fr-modal-title-bookmark-modal" className="fr-modal__title">
          <span className="fr-icon-arrow-right-line fr-fi--lg"></span>
          {mention} sauvegardée dans Ma sélection
        </h1>
        <div>Retrouvez toutes vos {mentions} mises en favoris dans Ma sélection.</div>
        <div className="mt-6">
          <Button className={"rounded-3xl text-sm mr-6 mb-2"} onClick={() => modal.close()} size="small">
            Continuer ma lecture
          </Button>
          <Button
            priority="secondary"
            className={"rounded-3xl text-sm"}
            linkProps={{ href: PFMV_ROUTES.MES_FICHES_SOLUTIONS, target: "_self" }}
            size="small"
          >
            <span onClick={() => setBadgeOff(NotificationElements.selectionMenuItem)}>Ma sélection</span>
          </Button>
        </div>
      </div>
    </modal.Component>
  );
};
