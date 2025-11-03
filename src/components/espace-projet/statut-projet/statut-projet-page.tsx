import { ProjetLastModification } from "@/src/components/espace-projet/statut-projet/projet-last-modification";
import { StatutProjetButtons } from "@/src/components/espace-projet/statut-projet/statut-projet-buttons";
import { StatutProjetActions } from "@/src/components/espace-projet/statut-projet/statut-projet-actions";

export const StatutProjetPage = () => {
  return (
    <>
      <section className="flex flex-wrap justify-between">
        <div className="max-w-[50rem]">
          <h2 className="fr-h5 !mb-4">Comment se passe votre projet sur Plus fraîche ma ville ?</h2>
          <p>
            Vos retours sont précieux pour améliorer notre service et vous offrir un accompagnement personnalisé.
            N'hésitez pas à mettre à jour régulièrement cette information.
          </p>
        </div>
        <ProjetLastModification />
      </section>
      <section className="mt-12">
        <StatutProjetButtons />
        <StatutProjetActions className="mt-24" />
      </section>
    </>
  );
};
