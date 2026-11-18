import SignInCard from "@/src/components/signin/SignInCard";
import { createModal } from "@codegouvfr/react-dsfr/Modal";

export const unauthenticatedSaveModal = createModal({
  id: "unauthenticated-save-modal",
  isOpenedByDefault: false,
});
export const GenericSaveModalUnauthenticated = () => {
  return (
    <unauthenticatedSaveModal.Component title="Connexion à l'espace projet" className="custom-modal">
      <SignInCard message="save" />
    </unauthenticatedSaveModal.Component>
  );
};
