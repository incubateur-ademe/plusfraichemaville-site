export const StatutActionRdv = () => {
  return (
    <div className="flex w-full gap-6">
      <div className="max-w-[25rem] rounded-2xl bg-dsfr-background-default-grey-hover p-8">
        <h3 className="fr-h2">Besoin d’aide ? Discutons-en.</h3>
        <p>
          Notre équipe est à votre écoute pour toute question. N'hésitez pas à réserver un créneau dans notre agenda en
          ligne.
          <br /> <br />À bientôt !
        </p>
      </div>
      <iframe
        className="h-[30rem] w-full overflow-hidden"
        src="https://meetings-eu1.hubspot.com/tde-ferrieres?uuid=a93c56a5-c68f-4854-9010-a7cf0d8381eb"
      />
    </div>
  );
};
