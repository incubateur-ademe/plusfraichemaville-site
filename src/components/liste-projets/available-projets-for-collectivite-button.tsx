import Button from "@codegouvfr/react-dsfr/Button";
import { useModalStore } from "@/src/stores/modal/provider";
import { useUserStore } from "@/src/stores/user/provider";

export const AvailableProjetsForCollectiviteButton = ({ className }: { className?: string }) => {
  const setShowAvailableProjetForUser = useModalStore((state) => state.setShowAvailableProjetForUser);
  const userSirenInfo = useUserStore((state) => state.userInfos?.sirenInfo);

  return (
    <>
      {!userSirenInfo?.siren ? null : (
        <Button
          iconId="ri-add-circle-fill"
          priority="secondary"
          onClick={() => setShowAvailableProjetForUser(true)}
          className={className}
        >
          {"Rejoindre d'autres projets de ma collectivité"}
        </Button>
      )}
    </>
  );
};
