import SignInCard from "@/src/components/signin/SignInCard";
import { createModal } from "@codegouvfr/react-dsfr/Modal";

export const unauthenticatedSaveModal = createModal({
  id: "unauthenticated-save-modal",
  isOpenedByDefault: false,
});
export const GenericSaveModalUnauthenticated = () => {
  return (
    <unauthenticatedSaveModal.Component title="" className="custom-modal">
      <h1 className="fr-h4">{"Connexion à l'espace projet"}</h1>
      <SignInCard message="save" />
    </unauthenticatedSaveModal.Component>
  );
};
