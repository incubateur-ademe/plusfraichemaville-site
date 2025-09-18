import { GenericSaveFicheButtonWithOpener } from "./generic-save-button";
import { GenericSaveButtonElement } from "./generic-save-button-element";
import { trackEvent } from "@/src/helpers/matomo/track-matomo";
import { SITE_VITRINE_BOOKMARK_FICHE } from "@/src/helpers/matomo/matomo-tags";

export const GenericSaveUnauthenticated = ({ ...props }: GenericSaveFicheButtonWithOpener) => {
  const updater = () => {
    trackEvent(SITE_VITRINE_BOOKMARK_FICHE);
    if (props.opener != null) {
      props.opener();
    }
  };
  return <GenericSaveButtonElement isSaved={false} update={updater} {...props} />;
};
