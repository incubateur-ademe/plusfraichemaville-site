import { ProjetLastModification } from "@/src/components/espace-projet/statut-projet/projet-last-modification";
import { STATUT_PROJET_BUTTONS } from "@/src/components/espace-projet/statut-projet/statut-projet";
import { upsertProjetAction } from "@/src/actions/projets/upsert-projet-action";
import { StatutProjetButtons } from "@/src/components/espace-projet/statut-projet/statut-projet-buttons";

export const StatutProjetTab = () => {
  return (
    <>
      <section className="flex justify-between flex-wrap">
        <div className="max-w-[50rem]">
          <h2 className="fr-h5 !mb-4">Comment se passe votre projet sur Plus fraîche ma ville ?</h2>
          <p>
            Vos retours sont précieux pour améliorer notre service et vous offrir un accompagnement personnalisé.
            N'hésitez pas à mettre à jour régulièrement cette information.
          </p>
        </div>
        <ProjetLastModification/>
      </section>
      <section className="mt-12">
        <StatutProjetButtons/>

      </section>

    </>
  );
};
