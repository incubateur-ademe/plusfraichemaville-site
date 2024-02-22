import { AgentConnectButton } from "@codegouvfr/react-dsfr/AgentConnectButton";

export const AgentConnectCard = () => {
  return (
    <div className="rounded-2xl bg-dsfr-grey-975 w-full p-11">
      <strong className="text-xl text-black block mb-9">
        Connectez-vous et créez votre projet pour faire votre simulation budgétaire et accéder à de nombreuses
        recommandations.
      </strong>

      <p className="text-base font-normal text-black mb-9">
        Vous n’avez jamais utilisé AgentConnect? Renseignez simplement votre adresse professionnelle.
      </p>

      {/* TODO: attention, ajouter l'url pour éviter le masquage du bouton AgentConnect */}
      <AgentConnectButton url="" className="[&>p]:mb-0" />
    </div>
  );
};
