import { StatutUserButtons } from "@/src/components/espace-projet/statut-user/statut-user-buttons";
import { StatutUserActions } from "@/src/components/espace-projet/statut-user/statut-user-actions";

export const StatutUserPage = () => {
  return (
    <>
      <section className="max-w-[50rem]">
        <h2 className="fr-h5 !mb-4">Vous n’avez pas créé de projet sur Plus fraîche ma ville : que s’est-il passé ?</h2>
        <p>Nous aimerions connaître les raisons afin de nous améliorer. Merci de votre réponse !</p>
      </section>
      <section className="mt-12">
        <StatutUserButtons />
        <StatutUserActions className="mt-24" />
      </section>
    </>
  );
};
