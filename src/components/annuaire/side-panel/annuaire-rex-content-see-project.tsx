import Button from "@codegouvfr/react-dsfr/Button";
import { useModalStore } from "@/src/stores/modal/provider";
import { trackEvent } from "@/src/helpers/matomo/track-matomo";
import { ANNUAIRE_SIDE_PANEL_VIEW_PROJET_MODAL_OPEN } from "@/src/helpers/matomo/matomo-tags";

export const AnnuaireRexContentSeeProject = ({ slug }: { slug: string }) => {
  const setCurrentAnnuaireRexProjet = useModalStore((state) => state.setAnnuaireRexProjetSlug);

  const openModal = () => {
    trackEvent(ANNUAIRE_SIDE_PANEL_VIEW_PROJET_MODAL_OPEN(slug));
    setCurrentAnnuaireRexProjet(slug);
  };

  return (
    <div className="text-nowrap text-pfmv-navy">
      <Button
        priority="tertiary no outline"
        className="!bg-dsfr-background-alt-blue-france !px-0 hover:underline"
        onClick={openModal}
      >
        Voir le projet <i className="ri-arrow-right-line ml-2 before:mb-[3px] before:!size-4"></i>
      </Button>
    </div>
  );
};
