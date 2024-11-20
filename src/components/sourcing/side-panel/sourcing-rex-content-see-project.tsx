import Button from "@codegouvfr/react-dsfr/Button";
import { useModalStore } from "@/src/stores/modal/provider";

export const SourcingRexContentSeeProject = ({ slug }: { slug: string }) => {
  const setCurrentSourcingRexProjet = useModalStore((state) => state.setCurrentSourcingRexProjet);

  const openModal = () => {
    setCurrentSourcingRexProjet(slug);
  };

  return (
    <div className="text-nowrap text-pfmv-navy">
      <Button
        priority="tertiary no outline"
        className="!bg-dsfr-background-alt-blue-france hover:underline"
        onClick={openModal}
      >
        Voir le projet <i className="ri-arrow-right-line ml-2 before:mb-[3px] before:!size-4"></i>
      </Button>
    </div>
  );
};
