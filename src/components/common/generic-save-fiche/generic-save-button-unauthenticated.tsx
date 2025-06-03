import { selectSavedOrUnsavedAssets } from "./assets";
import { GenericSaveFicheButtonWithOpener } from "./generic-save-button";
import { GenericSaveButtonElement } from "./generic-save-button-element";
import { trackEvent } from "@/src/helpers/matomo/track-matomo";
import { SITE_VITRINE_BOOKMARK_FICHE } from "@/src/helpers/matomo/matomo-tags";

export const GenericSaveUnauthenticated = ({ ...props }: GenericSaveFicheButtonWithOpener) => {
  const assets = selectSavedOrUnsavedAssets(false, "common");
  const updater = () => {
    trackEvent(SITE_VITRINE_BOOKMARK_FICHE);
    props.opener && props.opener();
  };
  return <GenericSaveButtonElement isSaved={false} assets={assets} update={updater} {...props} />;
};
