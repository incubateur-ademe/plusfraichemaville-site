import { GenericSaveButtonElement } from "./generic-save-button-element";
import { selectSavedOrUnsavedAssets } from "./assets";
import { GenericSaveFicheButtonWithOpener } from "./generic-save-button";
import { trackEvent } from "@/src/helpers/matomo/track-matomo";
import { ESPACE_PROJET_BOOKMARK_FICHE } from "@/src/helpers/matomo/matomo-tags";

export const GenericSaveAuthenticatedOutsideProjet = ({ opener, ...props }: GenericSaveFicheButtonWithOpener) => {
  const update = () => {
    trackEvent(ESPACE_PROJET_BOOKMARK_FICHE);
    opener && opener();
  };

  const assets = selectSavedOrUnsavedAssets(false, "common");

  return <GenericSaveButtonElement isSaved={false} update={update} assets={assets} {...props} />;
};
