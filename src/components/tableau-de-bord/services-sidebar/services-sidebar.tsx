import { ServiceAnnuaire } from "@/src/components/tableau-de-bord/services-sidebar/service-annuaire";
import { ServiceStatusProjet } from "@/src/components/tableau-de-bord/services-sidebar/service-status-projet";
import { ServiceRecommandations } from "@/src/components/tableau-de-bord/services-sidebar/service-recommandations";

export const ServicesSidebar = () => {
  return (
    <section className="max-w-[23.5rem] rounded-2xl  bg-dsfr-background-alt-grey px-6 py-4 md:w-[23.5rem]">
      <h2>Mes outils</h2>
      <div className="flex flex-col gap-4">
        <ServiceAnnuaire />
        <ServiceRecommandations />
        <ServiceStatusProjet />
      </div>
    </section>
  );
};
