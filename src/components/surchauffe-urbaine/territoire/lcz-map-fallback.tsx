import Alert from "@codegouvfr/react-dsfr/Alert";

export const LczMapLoadingErrorMessage = ({ onClose }: { onClose: () => void }) => {
  return (
    <>
      <Alert
        severity="error"
        title="Erreur technique"
        description="Erreur lors du chargement des données cartographiques."
        closable
        onClose={onClose}
        className="m-auto w-fit bg-white text-base"
      />
    </>
  );
};
