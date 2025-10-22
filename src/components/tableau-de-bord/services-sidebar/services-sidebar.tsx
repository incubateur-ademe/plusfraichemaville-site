import { ServicesAnnuaire } from "@/src/components/tableau-de-bord/services-sidebar/services-annuaire";
import { ServicesStatusProjet } from "@/src/components/tableau-de-bord/services-sidebar/services-status-projet";

export const ServicesSidebar = () => {
  return (
    <section className="min-w-[23.5rem] rounded-2xl bg-dsfr-background-alt-grey px-6 py-4">
      <h2>Mes outils</h2>
      <div className="flex flex-col gap-4">
      <ServicesAnnuaire />
      <ServicesStatusProjet />
    </div>
    </section>
  );
};
