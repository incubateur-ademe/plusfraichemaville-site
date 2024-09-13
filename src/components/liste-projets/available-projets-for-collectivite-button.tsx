import Button from "@codegouvfr/react-dsfr/Button";
import { useModalStore } from "@/stores/modal/provider";
import { useUserStore } from "@/stores/user/provider";

export const AvailableProjetsForCollectiviteButton = ({ className }: { className?: string }) => {
  const setCollectiviteIdToListAvailableProjets = useModalStore(
    (state) => state.setCollectiviteIdToListAvailableProjets,
  );
  const userCollectiviteId = useUserStore((state) => state.userInfos?.collectivites[0].collectivite_id);

  return (
    <Button
      iconId="ri-add-circle-fill"
      priority="secondary"
      onClick={() => userCollectiviteId && setCollectiviteIdToListAvailableProjets(userCollectiviteId)}
      className={className}
    >
      Rejoindre {"d'autres"} projets de ma collectivité
    </Button>
  );
};
