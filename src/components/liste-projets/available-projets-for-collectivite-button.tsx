import Button from "@codegouvfr/react-dsfr/Button";
import { useModalStore } from "@/src/stores/modal/provider";
import { useUserStore } from "@/src/stores/user/provider";
import { SirenInfo } from "@/src/lib/siren/types";

export const AvailableProjetsForCollectiviteButton = ({ className }: { className?: string }) => {
  const setShowAvailableProjetForUser = useModalStore((state) => state.setShowAvailableProjetForUser);
  const userInfos = useUserStore((state) => state.userInfos);
  const userSirenInfo = userInfos?.siren_info as SirenInfo | null;

  return (
    <>
      {!userSirenInfo?.siren ? null : (
        <Button
          type="button"
          iconId="ri-add-circle-fill"
          priority="secondary"
          onClick={() => setShowAvailableProjetForUser(true)}
          className={className}
        >
          {userInfos?.is_agent_public
            ? "Rejoindre des projets de ma collectivité"
            : "Rejoindre des projets de mon entreprise"}
        </Button>
      )}
    </>
  );
};
